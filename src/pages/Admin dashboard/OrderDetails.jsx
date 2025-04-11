import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "../../css/OrderDetails.css"

import { Card, Button, Badge, Row, Col, Spinner } from "react-bootstrap";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`https://gravitas-backend.up.railway.app/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="ms-2">Loading order details...</p>
      </div>
    );

  const getBadgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Processing":
        return "info";
      case "Shipped":
        return "primary";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container mt-4">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-3 text-start text-success ">Order Details</h2>
        <Row>
          <Col md={6} >
            <h5 className="text-primary">Customer Information</h5>
            <p><strong>Name:</strong> {order.customer.name}</p>
            <p><strong>Email:</strong> {order.customer.email}</p>
            <p><strong>Phone:</strong> {order.customer.phone}</p>
            <p><strong>Address:</strong> {order.customer.address}, {order.customer.city} - {order.customer.postalCode}</p>

          </Col>
          <Col md={6} className="">
            <h5 className="text-primary ">Order Information</h5>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total Price:</strong> ${order.totalPrice}</p>
            <p><strong>Payment Method:</strong> {order.payment.method}</p>
            <p><strong>Dated:</strong> {moment(order.createdAt).format("DD-MM-YYYY HH:mm")}</p>

            <p>
              <strong>Payment Status:</strong>{" "}
              <Badge bg={order.payment?.isPaid ? "success" : "danger"}>
                {order.payment?.isPaid ? "Paid" : "Not Paid"}
              </Badge>
            </p>
            <p>
              <strong>Order Status:</strong>{" "}
              <Badge bg={getBadgeColor(order.status)}>
                {order.status}
              </Badge>
            </p>
          </Col>
        </Row>

        <h4 className="mt-4">Products Ordered:</h4>
        <Row>
          {order.products?.map((product, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="mb-3 shadow-sm">
                <Card.Body className="d-flex align-items-center">
                  <img
                    src={`https://gravitas-backend.up.railway.app/uploads/${product.images[0]}`}
                    alt={product.name}
                    className="rounded"
                    style={{ width: "60px", height: "60px", objectFit: "contain", marginRight: "10px" }}
                  />
                  <div>
                    <h6 className="mb-1">{product.name}</h6>
                    <p className="mb-0">
                      ${product.price} x {product.quantity}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default OrderDetails;
