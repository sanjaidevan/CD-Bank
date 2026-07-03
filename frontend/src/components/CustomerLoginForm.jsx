import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";
import { useState } from "react";
import logo from "../assets/CDlogo.png";
import "../styles/CustomerLogin.css";

function CustomerLoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    customerID: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };
  return (
    <Container fluid className="loginPage p-0">
      <Row className="g-0 min-vh-100">
        <Col md={7} className="leftSection">
          <img src={logo} alt="Crystal Delta" className="bankLogo" />

          <div className="welcomeContainer">
            <h1 className="welcomeText">
              Welcome to
              <br />
              <span>Crystal Delta</span>
              <br />
              Banking
            </h1>
          </div>
        </Col>
        <Col md={5} className="rightSection">
          <Card className="loginCard">
            <Card.Body>
              <p className="loginTitle">Login to your account</p>
              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-4">
                  <FormLabel>Customer ID</FormLabel>
                  <FormControl
                    type="email"
                    placeholder=""
                    name="customerID"
                    value={formData.customerID}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    type="password"
                    name="password"
                    placeholder=""
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <Button type="submit" className="loginBtn w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerLoginForm;
