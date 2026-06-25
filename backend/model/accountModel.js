import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnect.js";


export const AccountModel = sequelize.define("AccountTable", {
    acc_num: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    acc_type: {
        type: DataTypes.ENUM("savings", "current", "credit"),
        allowNull: false,
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ifc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        tableName: "acc_tbl"
    });