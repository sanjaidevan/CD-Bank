import { fetchCustomerById } from "../Services/customer.services.js";
import bcrypt from 'bcrypt';

export const customerAuthentication = async (req, res, next) => {
    try {
        const { customerID, password } = req.body;

        if (!customerID || !password) {
            return res.status(400).json({ message: "Missing customerID or password" });
        }

        const customer = await fetchCustomerById(customerID);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const authenticated = await bcrypt.compare(password, customer.password);
        if (!authenticated) {
            return res.status(401).json({ message: "Invalid password" });
        }

        req.customer = customer;
        next();
    } catch (error) {
        next(error);
    }
};