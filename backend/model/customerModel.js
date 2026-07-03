import { DataTypes } from "sequelize";
import { sequelize } from "../db/config.js";

export const CustomerModel = sequelize.define("CustomerTable", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(253),
        allowNull: false,
        unique: true,
    },
    mobile: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.ENUM("true", "false"),
        allowNull: false,
    },
},
    {
        tableName: "customerTable"
    });

export async function createTableCustomer() {
    await CustomerModel.sync({ force: true });
    console.log("Created Tables");
}

