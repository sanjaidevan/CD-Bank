import { Navbar, Container, Button } from "react-bootstrap";
import logo from "../assets/CDlogo.png";
import "../styles/CustomerNavbar.css";

function CustomerNavbar({ onLogout }) {
  return (
    <Navbar bg="white" expand="lg" className="customerNavbar shadow-sm">
      <Container fluid>
        <Navbar.Brand>
          <img src={logo} alt="Crystal Delta" className="navbarLogo" />
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-3">
          <Button variant="outline-dark" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default CustomerNavbar;
