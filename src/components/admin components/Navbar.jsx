import { Link, useNavigate } from "react-router-dom"; 
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      const response = await fetch("https://gravitas-backend.up.railway.app/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/login"); 
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >GRAVITAS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/dashboard">Home</Nav.Link>
            <Nav.Link as={Link} to="/admin/product">Products</Nav.Link>
            <Nav.Link as={Link} to="/admin/orders">Orders</Nav.Link>
            <Nav.Link as={Link} to="/admin/banners">Banners</Nav.Link>

            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleLogout} style={{ color: "red" }}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
