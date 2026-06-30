import React, { useState } from "react";
import { validateTransferForm } from "../utils/validateTransfer";
import { toast } from "react-toastify";
import { transferFund } from "../api/customerApi";

function AmountTransfer(accounts,navigate) {
  
  //Create a Use State for transferfund default all the property value is null
  const [transferForm, setTransferForm] = useState({
    sourceAccType: accounts.accType||"",
    beneficiaryAccNum: "",
    amount: "",
    remarks: "",
  });

  //Another useSate that for check the submitting by default it set as false
  const [submitting, setSubmitting] = useState(false);

  //It act as a event listener when the form data get changes
  const handleTransferChange = (event) => {
    const { name, value } = event.target;
    setTransferForm((prev) => ({ ...prev, [name]: value }));
  };

  //It handles the Transfer Form reset the details
  const handleTransferReset = () => {
    setTransferForm({
      sourceAccType: "",
      beneficiaryAccNum: "",
      amount: "",
      remarks: "",
    });
  };

  //It handles the form submission
  const handleTransferSubmit = async (event) => {
    event.preventDefault();
    const { sourceAccType, beneficiaryAccNum, amount, remarks } = transferForm;

    //Validate the form details
    const validationError = validateTransferForm({
      sourceAccType,
      beneficiaryAccNum,
      amount,
    });

    if (validationError) {
      return toast.error(validationError);
    }

    //Reject transfer to same Account
    const sourceAccount = accounts.find(
      (account) => account.accountType === sourceAccType,
    );
    if (sourceAccount && sourceAccount.accountNumber === beneficiaryAccNum) {
      return toast.error("Cannot Transfer Amount to Same Account");
    }
    //Set Form submitting true
    setSubmitting(true);
    try {
      //Get the Customer Credentials from local Storage
      const credentials = JSON.parse(
        localStorage.getItem("customerCredentials"),
      );
      if (!credentials) {
        toast.error("Session expired. Please Login");
        navigate("/");
        return;
      }
      await transferFund({
        accType: sourceAccType,
        reciver_Account: beneficiaryAccNum,
        remarks: remarks || "",
        amount_transfer:parseFloat(amount),
        customerID: credentials.customerID,
        password: credentials.password,
      });
      toast.success("Transfer successfull");
      handleTransferReset();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return {
    transferForm,
    submitting,
    handleTransferChange,
    handleTransferReset,
    handleTransferSubmit,
  };
}

export default AmountTransfer;
