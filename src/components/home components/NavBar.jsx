import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/NavBar.css";

const NavBar = ({ searchTerm, setSearchTerm, setShowSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);
  const { cart } = useCart();

  return (
    <div className="navbar-container">
      <Container fluid className="navbar-inner">
        {/* Left: Sidebar Button */}
        <div className="navbar-left">
          <Button variant="light" onClick={() => setShowSidebar(true)}>
            <i className="bi bi-list"></i>
          </Button>
        </div>

        {/* Center: Brand Name */}
        <div className="navbar-center">
          <h1 className="navbar-brand-text">GRAVITAS.</h1>
        </div>

        {/* Right: Search + Cart */}
        <div className="navbar-right">
          {showSearch ? (
            <Form.Control
              type="text"
              placeholder="Search..."
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              onBlur={() => setShowSearch(false)}
            />
          ) : (
            <i
              className="bi bi-search search-icon"
              onClick={() => setShowSearch(true)}
            ></i>
          )}

          <Link to="/cart" className="cart-link position-relative">
            <i className="bi bi-cart text-dark cart-icon"></i>
            {cart.length > 0 && (
              <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
