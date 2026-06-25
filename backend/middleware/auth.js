import bcrypt from "bcrypt";
import { getCustomerById } from "../Services/customer.services.js";

export const customerAuthentication = async (req, res, next) => {
    try {
        const { customerID, password } = req.body;
        const customer = await getCustomerById(customerID);
        const authentication = await bcrypt.compare(password, customer.password)
        if (authentication) { return res.status(200).json({ message: "Customer Login Successfull" }) };
        return res.status(404).json({ message: "Customer Login Failed" });
        console.log(customer)
    } catch (error) {
        next(error);
    }
};