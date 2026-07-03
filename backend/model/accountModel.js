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
    customer_id: {  // Added this column because of sqlMessage: "Field 'customer_id' doesn't have a default value",

        type: DataTypes.UUID,
        allowNull: false,
    },
},
    {
        tableName: "acc_tbl"
    });