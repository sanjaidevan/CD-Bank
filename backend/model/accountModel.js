import { DataTypes } from "sequelize";
import { sequelize } from "../db/config.js";

export const AccountModel = sequelize.define("AccountTable", {
    accountNumber: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    accountType: {
        type: DataTypes.ENUM("savings", "current", "credit"),
        allowNull: false,
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ifsc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    customerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "customerTable",
            key: "id"
        },
    },
},
    {
        tableName: "accountsTable"
    });