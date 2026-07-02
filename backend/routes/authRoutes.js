import express from "express";
import { signToken } from "../utils/jwt.js";
import { fetchCustomerById } from "../services/customerServices.js";
import bcrypt from 'bcrypt';


export const authRouter = express.Router();
authRouter.post("/login", async (req, res, next) => {
    try {
        const { customerID, password } = req.body;

        if (!customerID || !password) {
            return res.status(400).json({ message: "Missing customerID or password" });
        }

        const customer = await fetchCustomerById(customerID);
        console.log(customer.isActive);
        if (!customer || customer.isActive === "false") {
            return res.status(404).json({ message: "Customer not found" });
        }

        const authenticated = await bcrypt.compare(password, customer.password);
        if (!authenticated) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const payload = {
            customerID: customer.id,
            emailId: customer.email,
            firstName: customer.firstName,
            isActive: customer.isActive
        };
        const token = signToken(payload);
        return res.status(200).json({ token, customer: { customerID: customer.id, firstName: customer.firstName, emailId: customer.email } });
    } catch (error) {
        next(error);
    }
})