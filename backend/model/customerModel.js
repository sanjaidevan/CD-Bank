import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnect.js";


export const CustomerModel = sequelize.define("CustomerTable", {
    customer_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:
        {
            is: {
                args: /^[A-Za-z]+([ ][A-Za-z]+)*$/,
                msg: "Invalid First Name"
            },
            len: {
                args: [3, 50],
                msg: "First Name must between 3 and 50"
            }
        }
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:
        {
            is: {
                args: /^[A-Za-z]+([ .][A-Za-z]+)*$/,
                msg: "Invalid Last Name"
            },
            len: {
                args: [1, 50],
                msg: "Last Name must between 1 and 50"
            }
        }
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email_id: {
        type: DataTypes.STRING(253),
        allowNull: false,
        unique: true,
        validate: { is: { args: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, msg: "Invalid Email" } }
    },
    mobile: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true,
        validate: { is: { args: /^\+\d{12,16}$/, msg: "Invalid Mobile" } }
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
        tableName: "customer_tbl"
    });
    
export async function createTableCustomer() {
    await CustomerModel.sync({force:true});
    console.log("Created Tables");
}

