import { AccountModel } from "../model/accountModel.js";
import { CustomerModel } from "../model/customerModel.js";
import { TransactionModel } from "../model/transactionModel.js";



export const fetchCustomerById = async (customerID) => { //name change from getCustomerById to fetchCustomerById
    const customer = await CustomerModel.findOne({ where: { email: customerID } });
    console.log(customer);
    return customer;
};

export const fetchCustomerAccount = async (customerID) => {
    const accounts = await AccountModel.findAll({ where: { customerId: customerID } });
    return accounts;
};

export const fetchTransactions = async (num) => {
    console.log("First Log",num)
    const transactions = await TransactionModel.findAll({ where: { accountNumber: num }, order: [["transactionDate", "DESC"]] });
    return transactions;
};

export const fetchLatestTransaction = async (number) => {
    const transaction = await TransactionModel.findOne({ where: { accountNumber: number }, order: [["transactionDate", "DESC"]] });
    return transaction;
};

export const newTransaction = async (new_transaction) => {
    const transaction = await TransactionModel.create(new_transaction);
    return transaction;
};