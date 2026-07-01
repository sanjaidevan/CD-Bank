import {
    fetchCustomerAccount,
    fetchCustomerAccounts,
    fetchLatestTransaction,
    fetchTransactions,
    newTransactionProcess,
} from "../services/customerServices.js";
import { randomUUID } from "crypto";
import { validateFundTransferDetails } from "../utils/inputValidation.js";


//Get Request Task Completed
export const getUser = async (req, res, next) => {
    try {
        const customerID = req.params.id;
        console.log(customerID);
        const accounts = await fetchCustomerAccount(customerID);
        return res.status(200).json(accounts);
    } catch (error) {
        next(error);
    }
};


export const getAccountDetails = async (req, res, next) => {
    try {
        const accountHolder = req.customer; //customer fetched from the previous middleware
        const accounts = await fetchCustomerAccounts(accountHolder.customerID);
        if (accounts.length == 0) return res.status(404).json({ message: "No Accounts Found" });
        return res.status(200).json({ customerName: accountHolder.firstName, accounts, });
    } catch (error) {
        next(error);
    }
};

export const getTransactions = async (req, res, next) => {
    try {
        const accountNumber = Number(req.params.accountNumber);
        const accountHolder = req.customer;
        const allTransactions = await fetchTransactions(accountNumber, accountHolder.customerID);
        if (allTransactions.length == 0) return res.status(404).json({ message: "No Transactions Found" });
        return res.status(200).json(allTransactions);
    } catch (error) {
        next(error);
    }
};

export const amountTransfer = async (req, res, next) => {
    try {
        const { customerID } = req.customer;
        const { accountNumber, reciverAccount, amountTransfer, remarks } = req.body;
        const checkDatatype = validateFundTransferDetails(accountNumber, reciverAccount, amountTransfer);
        if (checkDatatype === false) return res.status(422).json({ message: "Type error please check all the inputs" });
        const account = await fetchCustomerAccount(accountNumber, customerID);
        if (account.length == 0) return res.status(404).json({ message: "No accounts Found" });
        const newBalance = account.balance - amountTransfer;
        const newTransaction = { id: randomUUID(), description: remarks, closingBalance: newBalance, transferAmount: amountTransfer, accountNumber: account.accountNumber, transactionType: "debit", transactionStatus: "Completed", customerId: customerID }
        const transaction = await newTransactionProcess(newTransaction);
        //Balance in Account is updated
        return res.status(200).json({ message: "Transaction successfully" });
    } catch (error) {
        next(error);
    }
};
