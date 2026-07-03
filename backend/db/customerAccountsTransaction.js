import { CustomerModel } from "./model/customerModel.js";
import { AccountModel } from "./model/accountModel.js";
import { TransactionModel } from "./model/transactionModel.js";

CustomerModel.hasMany(AccountModel, {
    foreignKey: "customer_id",
    as: "accounts",
    onDelete: "CASCADE",
});
AccountModel.belongsTo(CustomerModel, {
    foreignKey: "customer_id",
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