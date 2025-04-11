import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Badge, Row, Col, Container, Form, Spinner } from "react-bootstrap";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://gravitas-backend.up.railway.app/products", {
          withCredentials: true, // Ensures JWT in cookies is sent
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://gravitas-backend.up.railway.app/products/${productId}`, {
        withCredentials: true,
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    if (categoryFilter === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === categoryFilter));
    }
  }, [categoryFilter, products]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="ms-2">Loading products...</p>
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Product List</h3>

      {/* Filter Dropdown */}
      <Form.Group className="mb-3 text-center">
        <Form.Label><strong>Filter by Category:</strong></Form.Label>
        <Form.Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-50 mx-auto"
        >
          <option value="All">All</option>
          <option value="Tops">Tops</option>
          <option value="Bottoms">Bottoms</option>
          <option value="Footwear">Footwear</option>
          <option value="Accessories">Accessories</option>
        </Form.Select>
      </Form.Group>

      <p className="text-center"><strong>Total Products: {filteredProducts.length}</strong></p>

      {/* Product Grid */}
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col md={6} lg={4} key={product._id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body className="d-flex align-items-center">
                  <img
                    src={`https://gravitas-backend.up.railway.app/uploads/${product.images?.[0]}`}
                    alt={product.name}
                    className="rounded"
                    style={{ width: "60px", height: "60px", objectFit: "contain", marginRight: "10px" }}
                  />
                  <div>
                    <h6 className="mb-1">{product.name}</h6>
                    <p className="mb-1"><strong>${product.price}</strong></p>
                    <p className="text-muted small">{product.category} - {product.subcategory}</p>
                    <p className="mb-1"><strong>Stock:</strong> {product.stock}</p>

                    {/* Colors */}
                    <p className="mb-1">
                      <strong>Colors:</strong>{" "}
                      {product.colors?.length > 0 ? (
                        product.colors.map((color, index) => (
                          <Badge key={index} bg="primary" className="me-1">{color}</Badge>
                        ))
                      ) : (
                        <span>No colors</span>
                      )}
                    </p>

                    {/* Sizes */}
                    <p>
                      <strong>Sizes:</strong>{" "}
                      {product.sizes?.length > 0 ? (
                        product.sizes.map((size, index) => (
                          <Badge key={index} bg="secondary" className="me-1">{size}</Badge>
                        ))
                      ) : (
                        <span>No sizes</span>
                      )}
                    </p>

                    <Button variant="danger" size="sm" onClick={() => deleteProduct(product._id)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No products found in this category.</p>
        )}
      </Row>
    </Container>
  );
};

export default ShowProducts;
