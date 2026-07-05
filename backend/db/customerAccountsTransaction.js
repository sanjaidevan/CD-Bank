import { CustomerModel } from "./model/customer.js";
import { AccountModel } from "./model/account.js";
import { TransactionModel } from "./model/transaction.js";

CustomerModel.hasMany(AccountModel, {
    foreignKey: "customerId",
    as: "accounts",
    onDelete: "CASCADE",
});
AccountModel.belongsTo(CustomerModel, {
    foreignKey: "customerId",
    as: "customer",
});

AccountModel.hasMany(TransactionModel, {
    foreignKey: "accountNumber",
    as: "transaction",
    onDelete: "CASCADE",
});
TransactionModel.belongsTo(AccountModel, {
    foreignKey: "accountNumber",
    as: "account"
});