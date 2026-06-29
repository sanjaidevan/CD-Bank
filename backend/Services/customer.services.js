import { AccountModel } from "../model/accountModel.js";
import { CustomerModel } from "../model/customerModel.js";
import { TransactionModel } from "../model/transactionModel.js";

export const fetchCustomerById = async (customerID) => { //name change from getCustomerById to fetchCustomerById
    const customer = await CustomerModel.findOne({ where: { email_id: customerID } });
    console.log(customer);
    return customer;
};

export const fetchCustomerAccount = async (customer_id) => {
    const accounts = await AccountModel.findAll({ where: { customer_id: customer_id } });
    return accounts;
};

export const fetchTransactions = async (account_num) => {
    const transactions = await TransactionModel.findAll({ where: { acc_num: account_num }, order: [["transaction_date", "DESC"]] });
    return transactions;
};

export const fetchLatestTransaction = async (account_num) => {
    console.log("🚀 ~ fetchLatestTransaction ~ account_num:", account_num);
    const transaction = await TransactionModel.findOne({ where: { acc_num: account_num }, order: [["transaction_date", "DESC"]] });
    console.log("🚀 ~ fetchLatestTransaction ~ transaction:", transaction);
    return transaction;
};

export const newTransaction = async (new_transaction) => {
    const transaction = await TransactionModel.create(new_transaction);
    return transaction;
};