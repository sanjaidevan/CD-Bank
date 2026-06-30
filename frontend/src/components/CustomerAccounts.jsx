// components/acc_num.jsx
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Accordion,
  Button,
  Form,
  FormLabel,
} from "react-bootstrap";
import CustomerNavbar from "./CustomerNavbar";

function CustomerAccounts({
  customerName,
  accounts,
  activeMenu,
  onMenuChange,
  onLogout,
  onViewStatement,
  transferContent
}) {
  return (
    <>
      <CustomerNavbar onLogout={onLogout} />

      <Container className="mt-5">
        <h1 className="greeting">Greetings {customerName}!</h1>

        <Card className="sideBar">
          <Row className="g-0">
            <Col md={3} className="border-end">
              <ListGroup variant="flush" className="mt-4">
                <ListGroup.Item
                  action
                  active={activeMenu === "summary"}
                  onClick={() => onMenuChange("summary")}
                  className="menuItem py-md-3"
                >
                  Account Summary
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  active={activeMenu === "transfer"}
                  onClick={() => onMenuChange("transfer")}
                  className="menuItem py-md-3"
                >
                  Transfer Fund
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={9} className="p-4">
              {activeMenu === "summary" && (
                <>
                  <p className="sectionTitle">Account Summary</p>
                  <Accordion>
                    {accounts?.map((account, index) => (
                      <Accordion.Item
                        eventKey={index.toString()}
                        key={account.accountNumber}
                        className="mb-3"
                      >
                        <Accordion.Header>
                          <div className="accountHeader">
                            <span className="accountName">
                              {account.accountType.charAt(0).toUpperCase() +
                                account.accountType.slice(1)}{" "}
                              Account
                            </span>
                            <span className="fw-bold">
                              Clossing Balance:
                              <span className="fw-bold balance">
                                {" "}
                                ₹{account.balance ?? "N/A"}
                              </span>
                            </span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <Row>
                            <Col>
                              <strong>Account Number :</strong>{" "}
                              {account.accountNumber}
                              <br />
                              <strong>Name:</strong> {customerName}
                            </Col>
                            <Col>
                              <strong>Branch :</strong> {account.branch}
                              <br />
                              <strong>IFSC :</strong> {account.ifsc}
                            </Col>
                            <Col className="text-end mt-2">
                              <Button onClick={() => onViewStatement(account)} className="btn-statement">
                                View Statement
                              </Button>
                            </Col>
                          </Row>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </>
              )}

              {activeMenu === "transfer" && transferContent}
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}

export default CustomerAccounts;
