import { DataTypes, DATE } from "sequelize";
import { sequelize } from "../db/config.js";


export const TransactionModel = sequelize.define("TransactionTable", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue:DataTypes.UUID
    },
    transactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    description: {
        type: DataTypes.STRING,
    },
    transactionType: {
        type: DataTypes.ENUM("debit", "credit"),
        allowNull: false
    },
    transactionStatus: {
        type: DataTypes.ENUM("initiated", "pending", "completed", "failed"),
        allowNull: false,
        defaultValue: "pending",
    },
    closingBalance:
    {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transferAmount: { //Added amount transfer
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    accountNumber: { //Added this column because as FK from acc_tbl,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "accountsTable",
            key: "accountNumber"
        }
    },
    customerId:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:"customerTable",
            key:"id"
        }
    }
}, {
    tableName: "transactionTable", //Table name Changed
});