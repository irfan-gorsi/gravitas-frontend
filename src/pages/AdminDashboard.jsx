import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../authUtils";
import axios from "axios";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { FaBoxOpen, FaShoppingCart } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const role = getUserRole();

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    newOrders: 0,
  });

  useEffect(() => {
    if (role !== "admin") {
      navigate("/home");
    } else {
      fetchDashboardStats();
    }
  }, [role, navigate]);

  const fetchDashboardStats = async () => {
    try {
      const { data } = await axios.get("https://gravitas-backend.up.railway.app/admin/stats");
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      <Row>
        <Col xs={12} sm={6} md={4}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body>
              <FaBoxOpen size={40} className="text-warning mb-3" />
              <h5>Manage Products</h5>
              <Button
                variant="warning"
                className="mt-3 w-100 py-2"
                onClick={() => navigate("/admin/product")}
              >
                Manage Products
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body>
              <FaShoppingCart size={40} className="text-success mb-3" />
              <h5>View All Orders</h5>
              <Button
                variant="success"
                className="mt-3 w-100 py-2"
                onClick={() => navigate("/admin/orders")}
              >
                View Orders
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body>
              <FaShoppingCart size={40} className="text-danger mb-3" />
              <h5>New Orders</h5>
              <Button
                variant="danger"
                className="mt-3 w-100 py-2"
                onClick={() => navigate("/admin/orders")}
              >
                View New Orders
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
