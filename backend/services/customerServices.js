import { where } from "sequelize";
import { AccountModel } from "../model/accountModel.js";
import { CustomerModel } from "../model/customerModel.js";
import { TransactionModel } from "../model/transactionModel.js";



export const fetchCustomerById = async (customerID) => { //name change from getCustomerById to fetchCustomerById
    const customer = await CustomerModel.findOne({ where: { email: customerID } });
    return customer;
};

export const fetchCustomerAccounts = async (customerID) => {
    const accounts = await AccountModel.findAll({ where: { customerId: customerID } });
    return accounts;
};

export const fetchTransactions = async (number, customerID) => {
    const transactions = await TransactionModel.findAll({ where: { accountNumber: number, customerId: customerID }, order: [["transactionDate", "DESC"]] });
    return transactions;
};

export const fetchLatestTransaction = async (number) => {
    const transaction = await TransactionModel.findOne({ where: { accountNumber: number }, order: [["transactionDate", "DESC"]] });
    return transaction;
};

export const newTransactionProcess = async (newTransactionValues) => {
    const transaction = await TransactionModel.create(newTransactionValues);
    return transaction;
};

export const fetchCustomerAccount = async (number, customerID) => {
    const account = await AccountModel.findOne({ where: { accountNumber: number, customerId: customerID } });
    return account;
};

export const updateAccountBalance = async (number, newBalance) => {
    const updatedBalance = await AccountModel.update({ balance: newBalance }, { where: { accountNumber: number } })
}