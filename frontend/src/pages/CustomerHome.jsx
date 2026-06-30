// CustomerHome.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getCustomerAccounts,
  transferFund,
  getAccountStatement,
} from "../api/customerApi";
import { validateTransferForm } from "../utils/validateTransfer";
import AccountStatement from "../components/AccountStatement";
import AmountTransfer from "./AmountTransfer";
import TransferFund from "../components/TransferFund";
import CustomerAccounts from "../components/CustomerAccounts";

function CustomerHome() {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [activeMenu, setActiveMenu] = useState("summary");
  //Handle Transfer Logics
  const {
    transferForm, //Form data
    submitting, //Submitting Form
    handleTransferChange, //When the form changes
    handleTransferReset, //For form reset
    handleTransferSubmit, //For form Submit
  } = AmountTransfer(accounts, navigate); //Calls the logic function

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
      const response = await getCustomerAccounts();
      console.log(response.data);
      const { customerName, accounts } = response.data;
      setCustomerName(customerName);
      setAccounts(accounts);
      console.log(accounts);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("customer");
    toast.success("Logout Successful");
    navigate("/");
  };

  const handleViewStatement = async (account) => {
    try {
      const response = await getAccountStatement(account.accountNumber);
      console.log("Response", response);
      setStatementModal({
        show: true,
        account: account,
        transactions: response.data, // backend returns array of transactions
      });
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.message || "Failed to load statement");
      console.error(error);
    }
  };

  const handleCloseStatement = () => {
    setStatementModal({ show: false, account: null, transactions: [] });
  };

  const transferContent = (
    <TransferFund
      accounts={accounts}
      transferForm={transferForm}
      onChange={handleTransferChange}
      onSubmit={handleTransferSubmit}
      onReset={handleTransferReset}
      submitting={submitting}
    />
  );

  return (
    <>
      <CustomerAccounts
        customerName={customerName}
        accounts={accounts}
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        onLogout={handleLogout}
        onViewStatement={handleViewStatement}
        transferContent={transferContent}
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
