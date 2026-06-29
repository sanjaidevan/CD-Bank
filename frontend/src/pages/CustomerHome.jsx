// CustomerHome.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomerAccounts from "../components/CustomerAccounts";
import {
  getCustomerAccounts,
  transferFund,
  getAccountStatement,
} from "../api/customerApi";
import { validateTransferForm } from "../utils/validateTransfer";
import AccountStatement from "../components/AccountStatement";

function CustomerHome() {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [activeMenu, setActiveMenu] = useState("summary");
  const [transferForm, setTransferForm] = useState({
    sourceAccType: "",
    beneficiaryAccNum: "",
    amount: "",
    remarks: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const [statementModal, setStatementModal] = useState({
    show: false,
    account: null,
    transactions: [],
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const credentials = JSON.parse(
        localStorage.getItem("customerCredentials"),
      );
      if (!credentials) {
        toast.error("Credential Error");
        navigate("/");
        return;
      }
      const response = await getCustomerAccounts(credentials);
      const { customerName, accounts } = response.data;
      setCustomerName(customerName);
      setAccounts(accounts);
      if (accounts.length > 0) {
        setTransferForm((prev) => ({
          ...prev,
          sourceAccType: accounts[0].acc_type,
        }));
      }
      console.log(accounts);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("customerCredentials");
    toast.success("Logout Successful");
    navigate("/");
  };

  const handleTransferChange = (e) => {
    const { name, value } = e.target;
    setTransferForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransferReset = () => {
    setTransferForm({
      sourceAccType: accounts[0]?.acc_type || "",
      beneficiaryAccNum: "",
      amount: "",
      remarks: "",
    });
  };

  const handleTransferSubmit = async (e) => {
    e.preventDefault();
    const { sourceAccType, beneficiaryAccNum, amount, remarks } = transferForm;

    const validationError = validateTransferForm({
      sourceAccType,
      beneficiaryAccNum,
      amount,
    });
    if (validationError) {
      return toast.error(validationError);
    }

    const sourceAccount = accounts.find(
      (acc) => acc.acc_type === sourceAccType,
    );
    if (sourceAccount && sourceAccount.acc_num === beneficiaryAccNum) {
      return toast.error("Cannot transfer to the same account");
    }

    setSubmitting(true);
    try {
      const credentials = JSON.parse(
        localStorage.getItem("customerCredentials"),
      );
      if (!credentials) {
        toast.error("Session expired. Please login again.");
        navigate("/");
        return;
      }
      await transferFund({
        accType: sourceAccType,
        reciver_Account: beneficiaryAccNum,
        amount_transfer: parseFloat(amount),
        remarks: remarks || "",
        customerID: credentials.customerID,
        password: credentials.password,
      });
      toast.success("Transfer successful!");
      handleTransferReset();accounts
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewStatement = async (account) => {
    try {
      const credentials = JSON.parse(
        localStorage.getItem("customerCredentials"),
      );
      if (!credentials) {
        toast.error("Session expired. Please login again.");
        navigate("/");
        return;
      }
      const response = await getAccountStatement({
        accType: account.acc_type,
        customerID: credentials.customerID,
        password: credentials.password,
      });
      setStatementModal({
        show: true,
        account: account,
        transactions: response.data, // backend returns array of transactions
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load statement");
    }
  };

  const handleCloseStatement = () => {
    setStatementModal({ show: false, account: null, transactions: [] });
  };

  return (
    <>
      <CustomerAccounts
        customerName={customerName}
        accounts={accounts}
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        onLogout={handleLogout}
        transferForm={transferForm}
        onTransferChange={handleTransferChange}
        onTransferSubmit={handleTransferSubmit}
        onTransferReset={handleTransferReset}
        submitting={submitting}
        onViewStatement={handleViewStatement}
      />

      <AccountStatement
        show={statementModal.show}
        onClose={handleCloseStatement}
        account={statementModal.account}
        transactions={statementModal.transactions}
      />
    </>
  );
}

export default CustomerHome;
