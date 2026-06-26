import { sequelize } from "../config/dbConnect.js";
import { sampleAccounts } from "./sampleAccount.js";
import { sampleCustomers } from "./sampleCustomer.js";
import { sampleTransactions } from "./sampleTransaction.js";


async function seed() {
    try {
        sequelize.authenticate();
        await sampleCustomers();
        await sampleAccounts();
        await sampleTransactions();
    } catch (error) {
        console.error(error);
    }
};

seed();