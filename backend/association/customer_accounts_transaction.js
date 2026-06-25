import { CustomerModel } from "../model/customerModel";
import { AccountModel } from "../model/accountModel";
import { TransactionModel } from "../model/transactionModel";

CustomerModel.hasMany(AccountModel, {
    foreignKey: "customer_id",
    as:"accounts",
    onDelete:"CASCADE",
});
AccountModel.belongsTo(CustomerModel,{
    foreignKey: "customer_id",
    as:"customer",
});

AccountModel.hasMany(TransactionModel,{
    foreignKey:"acc_num",
    as: "transaction",
    onDelete:"CASCADE",
});
TransactionModel.belongsTo(AccountModel,{
    foreignKey: "acc_num",
    as: "account"
});