import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row,Col, ListGroup, Offcanvas } from "react-bootstrap";
import ProductCard from "../components/home components/ProductCard";
import Footer from "../components/home components/Footer";
import NavBar from "../components/home components/NavBar";
import PrimaryBanner from "../components/home components/PrimaryBanner";
import SecondaryBanner from "../components/home components/SecondaryBanner";
import "../css/Home.css";
import "../css/Footer.css";
import "../css/NavBar.css";

const Home = () => {
  const [categories, setCategories] = useState([
    "Tops",
    "Bottoms",
    "Accessories",
    "Footwear",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Featured Products");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://gravitas-backend.up.railway.app/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
  
    if (searchTerm) {
      filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (selectedCategory !== "Featured Products") {
      filtered = products.filter(
        (product) => product.category === selectedCategory
      );
    }
  
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);
  
  return (
    <>    <div className="HomeContainer">
      <Container fluid className="px-0">
        {/*  Show Banner ONLY if there's no search term and the category is Featured Products */}
        {selectedCategory === "Featured Products" && !searchTerm && <PrimaryBanner />}
  
        {/* Navbar Component */}
        <NavBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setShowSidebar={setShowSidebar}
        />
  
        {/* Sidebar */}
        <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Categories</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup>
              <ListGroup.Item
                action
                onClick={() => {
                  setSelectedCategory("Featured Products");
                  setSearchTerm(""); // Reset search when clicking Home
                  setShowSidebar(false);
                }}
              >
                Home
              </ListGroup.Item>
              {categories.map((category) => (
                <ListGroup.Item
                  key={category}
                  action
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearchTerm(""); // Reset search when selecting category
                    setShowSidebar(false);
                  }}
                >
                  {category}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
  
        {/* Products Grid */}
        <Row className="p-4">
  <h2>{searchTerm ? "Search Results" : selectedCategory}</h2>
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <Col
        key={product._id}
        xs={6}    // 2 per row on mobile
        sm={6}
        md={4}
        lg={3}
        className="mb-4"
      >
        <ProductCard product={product} />
      </Col>
    ))
  ) : (
    <p>No products available in this category.</p>
  )}
</Row>

      </Container>
      {selectedCategory === "Featured Products" && !searchTerm && <SecondaryBanner />}
    </div>
      <Footer />
    </>

  );
  
};

export default Home;
