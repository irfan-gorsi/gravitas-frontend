import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Badge, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment"; // For formatting date and time
import "../../css/AdminOrders.css"

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://gravitas-backend.up.railway.app/orders");
        const ordersData = response.data;

        setOrders(ordersData);
        setTotalOrders(ordersData.length);

        // Count new orders in the last 24 hours
        const last24Hours = moment().subtract(24, "hours");
        const newOrders = ordersData.filter(order =>
          moment(order.createdAt).isAfter(last24Hours)
        );
        setNewOrdersCount(newOrders.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`https://gravitas-backend.up.railway.app/orders/${orderId}/status`, {
        status: newStatus,
      });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Function to update payment status in the database
  const handlePaymentChange = async (orderId, newPaymentStatus) => {
    try {
      await axios.put(`https://gravitas-backend.up.railway.app/orders/${orderId}/pay`, {
        isPaid: newPaymentStatus === "Paid",
      });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId
            ? { ...order, payment: { ...order.payment, isPaid: newPaymentStatus === "Paid" } }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const handleDeleteClick = orderId => {
    setSelectedOrderId(orderId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`https://gravitas-backend.up.railway.app/orders/${selectedOrderId}`);
      setOrders(prevOrders =>
        prevOrders.filter(order => order._id !== selectedOrderId)
      );
      setTotalOrders(prev => prev - 1); // Decrease total orders count
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2> Order Management</h2>

      {/* Orders Summary */}
      <div className="d-flex justify-content-between mb-3">
        <h5>Total Orders: <Badge bg="primary">{totalOrders}</Badge></h5>
        <h5>New Orders (Last 24h): <Badge bg="success">{newOrdersCount}</Badge></h5>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Date & Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.customer.name || "Unknown"}</td>
                <td>${order.totalPrice}</td>
                <td>
                  <Form.Select
                    value={order.status}
                    onChange={e =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </td>
                <td>
                  {/* Payment Status Dropdown */}
                  <Form.Select
                    value={order.payment?.isPaid ? "Paid" : "Not Paid"}
                    onChange={e => handlePaymentChange(order._id, e.target.value)}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Not Paid">Not Paid</option>
                  </Form.Select>
                </td>
                <td>{moment(order.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                <td>
                  <Link to={`/admin/orders/${order._id}`} className="btn btn-info btn-sm me-2">
                    View
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteClick(order._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminOrders;
