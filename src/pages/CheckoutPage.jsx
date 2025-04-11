import React, { useState, useContext } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; //  Import Cart Context
import axios from "axios"; //  Import Axios
import "../css/CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext); //  Get cart & clearCart function

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    postalCode: "",
    address: "",
    phone: "",
    paymentMethod: "Cash on Delivery", // Default payment method
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Calculate Total Price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  //  Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const orderData = {
      customer: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),  
        postalCode: formData.postalCode.trim(), 
      },
      products: cart.map(item => ({
        productId: item._id || item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      totalPrice: totalPrice,
      status: "Pending",
      payment: { method: formData.paymentMethod, isPaid: false },
    };
  
    try {
  
      const response = await axios.post("https://gravitas-backend.up.railway.app/orders", orderData, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 201) {
        alert("Order placed successfully!");
        clearCart();
        console.log("Order Response:", response.data);
        navigate(`/order-confirmation/${response.data.order._id}`);
      }
    } catch (error) {
      console.error("Order submission failed:", error.response?.data || error);
      alert(`Failed to place order: ${error.response?.data?.message || "Try again"}`);
    }
  };
  
  
  return (
    <Container className="checkout-container mx-3">
      <h2 className="mb-4">Checkout</h2>

      {/*  Display Cart Items */}
      <Row className="mb-4">
        {cart.map((item, index) => (
          <Col key={index} xs={6} md={4} lg={3} className="mb-3">
            <Card className="text-center">
              <Card.Img
                variant="top"
                src={`https://gravitas-backend.up.railway.app/uploads/${item.image}`}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "80px",
                  objectFit: "contain",
                  borderRadius: "5px",
                  padding: "5px",
                  backgroundColor: "#fff",
                }}
              />
              <Card.Body>
                <h6>{item.name}</h6>
                <p className="mb-1">
                  Quantity: <strong>{item.quantity}</strong>
                </p>
                <p className="text-success">
                  Price: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/*  Checkout Form */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="checkoutform mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="checkoutform mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="checkoutform mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="checkoutform mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="checkoutform mb-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="checkoutform mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/*  Payment Method Selection */}
        <Form.Group className="checkoutform mb-3">
          <Form.Label>Payment Method</Form.Label>
          <Form.Select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Credit Card">Credit Card</option>
          </Form.Select>
        </Form.Group>

        {/*  Display Grand Total */}
        <h4 className="text-start mb-4">
          Grand Total: <span className="text-success">${totalPrice.toFixed(2)}</span>
        </h4>

        <Button variant="primary" type="submit">
          Place Order
        </Button>
      </Form>
    </Container>
  );
};

export default CheckoutPage;
