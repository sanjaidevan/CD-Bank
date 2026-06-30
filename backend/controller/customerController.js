import {
    fetchCustomerAccount,
    fetchLatestTransaction,
    fetchTransactions,
    newTransaction,
} from "../services/customerServices.js";
import { randomUUID } from "crypto";


function accountTypeCheck(accountNumber) {
    return accountNumber && isNaN(accountNumber);
}

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
        const accountHolder = req.body; //customer fetched from the previous middleware
        // console.log(accountHolder);
        const accounts = await fetchCustomerAccount(accountHolder.customerID);
        console.log(accounts);
        // const getAccountDetails = await accounts.map(async (acc) => {
        //     const lastTransaction = await fetchLatestTransaction(acc.dataValues.accountNumber);
        //     const balance = lastTransaction ? lastTransaction.balance : 0;
        //     return {
        //         accountNumber: acc.accountNumber,
        //         accountType: acc.accountType,
        //         branch: acc.branch,
        //         ifc: acc.ifc,
        //         balance,
        //     };
        // });
        // const accountDetails = await Promise.all(getAccountDetails);
        // console.log(accountDetails); 
        return res.status(200).json({ customerName: accountHolder.firstName, accounts, });
    } catch (error) {
        next(error);
    }
};

export const getTransactions = async (req, res, next) => {
    try {
        const accountHolder = req.body; //customer fetched from the previous middleware
        const accountNumber = Number(req.params.accountNumber);
        // console.log(JSON.parse(req.params.accountNumber));
        console.log(accountNumber);
        // if (!accountTypeCheck(accountNumber)) {
        //     return res.status(400).json({ message: "Invalid Account Number" });
        // }
        const allTransactions = await fetchTransactions(accountNumber);
        console.log(allTransactions);
        if (allTransactions.length == 0) {
            console.log("No Transactions Found");
            return res.status(404).json({ message: "No Transactions Found" });
        }
        // const transactions = allTransactions.sort(
        //     (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate),
        // ); Tested sorting to sort the transactions based on the date
        return res.status(200).json(allTransactions);
    } catch (error) {
        next(error);
    }
};

export const amountTransfer = async (req, res, next) => {
    try {
        const senderAccount = req.body;
        const { reciver_Account, accType, amount_transfer, remarks } = req.body;
        if (!accountTypeCheck(accType)) {
            return res.status(400).json({ message: "Invalid Account Type" });
        }
        const senderAccounts = await fetchCustomerAccount(
            senderAccount.customer_id,
        );
        const account = senderAccounts.find((acc) => acc.accountType === accType);
        if (!account) {
            return res.status(404).json({ message: "No Accounts Found" });
        }
        const allTransactions = await fetchTransactions(account.accountNumber);
        // const transactions = allTransactions.sort(
        //     (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate),
        // );
        if (allTransactions[0].balance < amount_transfer) {
            return res.status(404).json({ message: "Insufficent balance" });
        }
        const new_balance = allTransactions[0].balance - amount_transfer;
        console.log
        const new_transaction = { transaction_id: randomUUID(), description: remarks, balance: new_balance, amt_transfer: amount_transfer, accountNumber: account.accountNumber, "transaction_type": "debit" }
        const transaction = await newTransaction(new_transaction);
        return res.status(200).json({ message: "Transaction successfully" });
    } catch (error) {
        next(error);
    }
};
