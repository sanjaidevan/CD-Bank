import React, { useEffect, useState } from "react";
import { validateTransferForm } from "../utils/validateTransfer";
import { toast } from "react-toastify";
import { transferFund } from "../api/customerApi";

function useAmountTransfer(accounts, navigate) {
  //Create a Use State for transferfund default all the property value is null
  const [transferForm, setTransferForm] = useState({
    sourceAccountNumber: "",
    beneficiaryAccountNumber: "",
    amount: "",
    remarks: "",
  });

  useEffect(() => {
    setTransferForm({
      sourceAccountNumber: String(accounts[0]?.accountNumber) || "",
      beneficiaryAccountNumber: "",
      amount: "",
      remarks: "",
    });
  }, [accounts]);

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
      sourceAccountNumber: "",
      beneficiaryAccountNumber: "",
      amount: "",
      remarks: "",
    });
  };

  //It handles the form submission
  const handleTransferSubmit = async (event) => {
    event.preventDefault();
    const { sourceAccountNumber, beneficiaryAccountNumber, amount, remarks } =
      transferForm;

    //Validate the form details
    const validationError = validateTransferForm({
      sourceAccountNumber,
      beneficiaryAccountNumber,
      amount,
    });

    if (validationError) {
      return toast.error(validationError);
    }
    //Set Form submitting true
    setSubmitting(true);
    try {
      //Get the Customer Credentials from local Storage
      await transferFund({
        accountNumber: Number(sourceAccountNumber),
        receiverAccount: Number(beneficiaryAccountNumber),
        remarks: remarks || "",
        amountTransfer: parseFloat(amount),
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

export default useAmountTransfer;
