import {
  Button,
  Table,
  Row,
  Container,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

function CustomerLoginForm() {
  return (
    <Container fluid className="loginForm">
      <Row>
        <Col>Welcome to Crystall Delta Banking</Col>
        <Col>
          <Form>
            <FormGroup className="mb-3">
              <FormLabel>First Name</FormLabel>
              <FormControl
                type="text"
                name="firstName"
                value=""
                // onChange={handleChange}
                placeholder="Enter Your First Name"
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Last Name</FormLabel>
              <FormControl
                type="text"
                name="lastName"
                value=""
                // onChange={handleChange}
                placeholder="Enter Your Last Name"
              />
            </FormGroup>
            <Button
              type="button"
              variant="secondary"
              className="mx-2"
            //   onClick={onCancel}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerLoginForm;
