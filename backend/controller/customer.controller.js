import {
    fetchCustomerAccount,
    fetchLatestTransaction,
    fetchTransactions,
    newTransaction,
} from "../Services/customer.services.js";
import { randomUUID } from "crypto";


function accountTypeCheck(acc_type) {
    return acc_type && acc_type.trim();
}

export const getAccountDetails = async (req, res, next) => {
    try {
        const accountHolder = req.customer; //customer fetched from the previous middleware
        const accounts = await fetchCustomerAccount(accountHolder.customer_id);
        const getAccountDetails = await accounts.map(async (acc) => {
            console.log("🚀 ~ getAccountDetails ~ acc:", acc)
            console.log("🚀 ~ getAccountDetails ~ acc.AccountTable.dataValues:", acc.dataValues.acc_num);
            const lastTransaction = await fetchLatestTransaction(acc.dataValues.acc_num);
            console.log("🚀 ~ getAccountDetails ~ lastTransaction:", lastTransaction);
            const balance = lastTransaction ? lastTransaction.balance : 0; 
            return {
                acc_num: acc.acc_num,
                acc_type: acc.acc_type,
                branch: acc.branch,
                ifc: acc.ifc,
                balance,
            };
        });
        const accountDetails = await Promise.all(getAccountDetails);
        console.log(accountDetails);
        return res.status(200).json({ customerName: accountHolder.firstName, accounts: accountDetails, });
    } catch (error) {
        next(error);
    }
};

export const getTransactions = async (req, res, next) => {
    try {
        const account_holder = req.customer; //customer fetched from the previous middleware
        const { accType } = req.body;
        if (!accountTypeCheck(accType)) {
            return res.status(400).json({ message: "Invalid Account Type" });
        }
        const accounts = await fetchCustomerAccount(account_holder.customer_id);
        const account = accounts.find((acc) => acc.acc_type === accType);
        if (!account) {
            return res.status(404).json({ message: "No Accounts Found" });
        }
        const all_transactions = await fetchTransactions(account.acc_num);
        // const transactions = all_transactions.sort(
        //     (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date),
        // ); Tested sorting to sort the transactions based on the date
        return res.status(200).json(all_transactions);
    } catch (error) {
        next(error);
    }
};

export const amountTransfer = async (req, res, next) => {
    try {
        const senderAccount = req.customer;
        const { reciver_Account, accType, amount_transfer, remarks } = req.body;
        if (!accountTypeCheck(accType)) {
            return res.status(400).json({ message: "Invalid Account Type" });
        }
        const senderAccounts = await fetchCustomerAccount(
            senderAccount.customer_id,
        );
        const account = senderAccounts.find((acc) => acc.acc_type === accType);
        if (!account) {
            return res.status(404).json({ message: "No Accounts Found" });
        }
        const all_transactions = await fetchTransactions(account.acc_num);
        // const transactions = all_transactions.sort(
        //     (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date),
        // );
        if (all_transactions[0].balance < amount_transfer) {
            return res.status(404).json({ message: "Insufficent balance" });
        }
        const new_balance = all_transactions[0].balance - amount_transfer;
        console.log
        const new_transaction = { transaction_id: randomUUID(), description: remarks, balance: new_balance, amt_transfer: amount_transfer, acc_num: account.acc_num, "transaction_type": "debit" }
        const transaction = await newTransaction(new_transaction);
        return res.status(200).json({ message: "Transaction successfully" });
    } catch (error) {
        next(error);
    }
};
