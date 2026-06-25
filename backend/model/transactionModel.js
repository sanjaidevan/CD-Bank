import { DataTypes, DATE } from "sequelize";
import { sequelize } from "../config/dbConnect.js";


export const TransactionModel = sequelize.define("TransactionTable", {
    transaction_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    transaction_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    description: {
        type: DataTypes.STRING,
    },
    transaction_type: {
        type: DataTypes.ENUM("debit", "credit"),
        allowNull: false
    },
    transaction_status: {
        type: DataTypes.ENUM("initiated", "pending", "completed", "failed"),
        allowNull: false
    },
    balance:
    {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: "transaction_tbl",
});