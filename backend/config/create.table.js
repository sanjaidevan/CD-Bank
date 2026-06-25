import { AccountModel } from "../model/accountModel.js";
import { CustomerModel } from "../model/customerModel.js";
import { TransactionModel } from "../model/transactionModel.js";

export async function createTable(reCreateTable) {
    if (reCreateTable) {
        console.log("Inside the force");
        CustomerModel.sync({ force: true });
        AccountModel.sync({ force: true });
        TransactionModel.sync({ force: true });
    }
    else {
        console.log("Outside the force");
        CustomerModel.sync();
        AccountModel.sync();
        TransactionModel.sync();
    }
};