// components/CustomerAccounts.jsx
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Accordion,
  Button,
  Form,
} from "react-bootstrap";
import CustomerNavbar from "./CustomerNavbar";

function CustomerAccounts({
  customerName,
  accounts,
  activeMenu,
  onMenuChange,
  onLogout,
  transferForm,
  onTransferChange,
  onTransferSubmit,
  onTransferReset,
  submitting,
  onViewStatement,
}) {
  const selectedSourceAccount = accounts?.find(
    (acc) => acc.acc_type === transferForm.sourceAccType,
  );

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
                        key={account.acc_num}
                        className="mb-3"
                      >
                        <Accordion.Header>
                          <div className="accountHeader">
                            <span className="accountName">
                              {account.acc_type.charAt(0).toUpperCase() +
                                account.acc_type.slice(1)}{" "}
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
                              {account.acc_num}
                              <br />
                              <strong>Name:</strong> {customerName}
                            </Col>
                            <Col>
                              <strong>Branch :</strong> {account.branch}
                              <br />
                              <strong>IFSC :</strong> {account.ifc}
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

              {activeMenu === "transfer" && (
                <>
                  <p className="sectionTitle">Transfer Funds</p>
                  <div className="p-4">
                    <Form onSubmit={onTransferSubmit}>
                      <Row>
                        <Col md={6} className="py-md-3">
                          <Form.Label>From Account</Form.Label>
                        </Col>
                        <Col md={6} className="py-md-3">
                          <Form.Select
                            name="sourceAccType"
                            value={transferForm.sourceAccType}
                            onChange={onTransferChange}
                            required
                          >
                            <option value="" disabled>
                              -- Choose Account --
                            </option>
                            {accounts.map((acc) => (
                              <option key={acc.acc_num} value={acc.acc_type}>
                                {acc.acc_type} - {acc.acc_num}
                              </option>
                            ))}
                          </Form.Select>
                          {selectedSourceAccount && (
                            <Form.Text className="text-muted my-5">
                              Account Number: {selectedSourceAccount.acc_num}
                            </Form.Text>
                          )}
                        </Col>

                        {/* Beneficiary Account */}
                        <Col md={6} className="py-md-3">
                          <Form.Label>Beneficiary Account (To)</Form.Label>
                        </Col>
                        <Col md={6} className="py-md-3">
                          <Form.Select
                            name="beneficiaryAccNum"
                            value={transferForm.beneficiaryAccNum}
                            onChange={onTransferChange}
                            required
                          >
                            <option value="" disabled>
                              -- Choose Beneficiary --
                            </option>
                            {accounts
                              .filter(
                                (acc) =>
                                  acc.acc_type !== transferForm.sourceAccType,
                              )
                              .map((acc) => (
                                <option key={acc.acc_num} value={acc.acc_num}>
                                  {acc.acc_type} - {acc.acc_num}
                                </option>
                              ))}
                          </Form.Select>
                          <Form.Text className="text-muted">
                            Select the destination account from your own
                            accounts.
                          </Form.Text>
                        </Col>

                        {/* Amount */}
                        <Col md={6} className="py-md-3">
                          <Form.Label>Amount (₹)</Form.Label>
                        </Col>
                        <Col md={6}>
                          <Form.Control
                            type="number"
                            name="amount"
                            placeholder="Enter amount"
                            value={transferForm.amount}
                            onChange={onTransferChange}
                            min="1"
                            step="0.01"
                            required
                          />
                        </Col>

                        {/* Remarks */}
                        <Col md={6} className="py-md-3">
                          <Form.Label>Remarks (Optional)</Form.Label>
                        </Col>
                        <Col md={6} className="py-md-3">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            name="remarks"
                            placeholder="Add a note..."
                            value={transferForm.remarks}
                            onChange={onTransferChange}
                          />
                        </Col>

                        <div className="d-flex gap-2">
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={submitting}
                          >
                            {submitting ? "Processing..." : "Transfer Now"}
                          </Button>
                          <Button
                            variant="outline-secondary"
                            type="button"
                            onClick={onTransferReset}
                          >
                            Reset
                          </Button>
                        </div>
                      </Row>
                    </Form>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}

export default CustomerAccounts;
