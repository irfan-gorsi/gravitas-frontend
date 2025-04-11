import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; 
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../css/ProductDetails.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, cart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://gravitas-backend.up.railway.app/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-muted">Loading product details...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color before adding to cart.");
      return;
    }

    addToCart(product, selectedSize, selectedColor);
    alert("Product added to cart!");
  };

  return (
    <>
      {/* Cart Icon */}
      <div className="top-cart-icon text-end">
        <Link to="/cart" className="cart-icon-link position-relative">
          <i className="bi bi-cart" style={{ fontSize: "1.8rem", cursor: "pointer" }}></i>
          {cart.length > 0 && (
            <span className="cart-icon-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.length}
            </span>
          )}
        </Link>
      </div>

      <Container className="product-container">
        <Row className="align-items-center">
          {/* Left Side: Image Slider */}
          <Col md={6} className="d-flex flex-column align-items-center">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              slidesPerView={1}
              className="custom-swiper"
            >
              {product.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`https://gravitas-backend.up.railway.app/uploads/${img}`}
                    alt={`Product ${index + 1}`}
                    className="product-image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>

          {/* Right Side: Product Info */}
          <Col md={6} className="product-info">
            <h2 className="detail-product-title">{product.name}</h2>
            <h4 className="product-price">${product.price}</h4>
            <p className="product-detail">{product.description}</p>

            {/* Selectable Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-3">
                <strong>Sizes:</strong>
                <div className="size-options">
                  {product.sizes.map((size, index) => (
                    <Button
                      key={index}
                      className={`size-button ${selectedSize === size ? "selected" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Selectable Colors */}
            {product.colors?.length > 0 && (
              <div className="mb-3">
                <strong>Colors:</strong>
                <div className="color-options">
                  {product.colors.map((color, index) => (
                    <Button
                      key={index}
                      className={`color-button ${selectedColor === color ? "selected" : ""}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Buy Now and Add to Cart Buttons */}
            <div className="button-group">
              <Button className=" mb-2 Add-to-cart-button" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>

        {/* Include Footer */}
      </Container>
        <Footer />
    </>
  );
};

export default ProductDetail;
