import { Col, Form, FormLabel, Row, Button } from "react-bootstrap";

function TransferFund({
  accounts,
  transferForm,
  onChange,
  onSubmit,
  onReset,
  submitting,
}) {
  const selectedSourceAccount = accounts?.find(
    (account) => account.accountType === transferForm.sourceAccType,
  );
  return (
    <>
      <p className="sectionTitle">Transfer Funds</p>
      <div className="p-4">
        <Form onSubmit={onSubmit}>
          <Row>
            <Col md={6} className="py-md-3">
              <FormLabel>From Account</FormLabel>
            </Col>
            <Col md={6} className="py-md-3">
              <Form.Select
                name="sourceAccType"
                value={transferForm.sourceAccType}
                onChange={(e) => {
                  onChange(e);
                }}
                required
              >
                <option value="" disabled>
                  -- Choose Account --
                </option>
                {accounts.map((acc) => (
                  <option key={acc.accountNumber} value={acc.accountType}>
                    {acc.accountType} - {acc.accountNumber}
                  </option>
                ))}
              </Form.Select>
              {selectedSourceAccount && (
                <Form.Text className="text-muted my-5">
                  Account Number: {selectedSourceAccount.accountNumber}
                </Form.Text>
              )}
            </Col>

            {/* Beneficiary Account */}
            <Col md={6} className="py-md-3">
              <FormLabel>Beneficiary Account (To)</FormLabel>
            </Col>
            <Col md={6} className="py-md-3">
              <Form.Select
                name="beneficiaryAccNum"
                value={transferForm.beneficiaryAccNum}
                onChange={onChange}
                required
              >
                <option value="" disabled>
                  -- Choose Beneficiary --
                </option>
                {accounts
                  .filter((acc) => acc.accountType !== transferForm.sourceAccType)
                  .map((acc) => (
                    <option key={acc.accountNumber} value={acc.accountNumber}>
                      {acc.accountType} - {acc.accountNumber}
                    </option>
                  ))}
              </Form.Select>
              <Form.Text className="text-muted">
                Select the destination account from your own accounts.
              </Form.Text>
            </Col>

            {/* Amount */}
            <Col md={6} className="py-md-3">
              <FormLabel>Amount (₹)</FormLabel>
            </Col>
            <Col md={6} className="py-md-3">
              <Form.Control
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={transferForm.amount}
                onChange={onChange}
                min="1"
                step="0.01"
                required
              />
            </Col>

            {/* Remarks */}
            <Col md={6} className="py-md-3">
              <FormLabel>Remarks (Optional)</FormLabel>
            </Col>
            <Col md={6} className="py-md-3">
              <Form.Control
                as="textarea"
                rows={2}
                name="remarks"
                placeholder="Add a note..."
                value={transferForm.remarks}
                onChange={onChange}
              />
            </Col>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? "Processing..." : "Transfer Now"}
              </Button>
              <Button
                variant="outline-secondary"
                type="button"
                onClick={onReset}
              >
                Reset
              </Button>
            </div>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default TransferFund;
