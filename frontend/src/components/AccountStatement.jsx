import { Modal, Table, Button } from "react-bootstrap";

function AccountStatement({ show, onClose, account, transactions }) {
  if (!account) return null;

  return ( 
    <Modal
      show={show}
      onHide={onClose}
      size="lg"
      centered
      className="statement-modal"
    >
      <Button variant="link" className="btn-close-statement" onClick={onClose}>
        <span style={{ fontSize: "1.8rem", lineHeight: 1, color: "#f37021" }}>
          &times;
        </span>
      </Button>

      <Modal.Header className="border-0 pb-0">
        <div className="d-flex justify-content-between align-items-start w-100">
          <h5 className="mb-0">Statement</h5>
          <div className="text-end">
            <div>Account No: {account.accountNumber}</div>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Transaction No</th>
              <th>Credit / Debit</th>
              <th>Closing Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => {
              const isCredit = txn.transaction_type === "credit";
              const formattedAmount = isCredit
                ? `+${txn.transferAmount}`
                : `-${txn.transferAmount}`;
              return (
                <tr key={txn.id}>
                  <td>{txn.transactionDate}</td>
                  <td>{txn.description}</td>
                  <td>{txn.id}</td>
                  <td style={{ color: isCredit ? "green" : "red" }}>
                    {formattedAmount}
                  </td>
                  <td>{txn.closingBalance}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default AccountStatement;
