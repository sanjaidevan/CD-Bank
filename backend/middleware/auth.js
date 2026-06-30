import { fetchCustomerById } from "../services/customerServices.js";
import bcrypt from 'bcrypt';
import { verifyToken } from "../utils/jwt.js";

// export const customerAuthentication = async (req, res, next) => {
//     try {
//         const { customerID, password } = req.body;

//         if (!customerID || !password) {
//             return res.status(400).json({ message: "Missing customerID or password" });
//         }

//         const customer = await fetchCustomerById(customerID);
//         if (!customer) {
//             return res.status(404).json({ message: "Customer not found" });
//         }

//         const authenticated = await bcrypt.compare(password, customer.password);
//         if (!authenticated) {
//             return res.status(401).json({ message: "Invalid password" });
//         }

//         req.customer = customer;
//         next();
//     } catch (error) {
//         next(error);
//     }
// };

export const customerAuthentication = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer'))
        {
            return res.status(401).json({message:"Invalid Header"});
        }
        const token = authHeader.split(' ')[1];
        const decode = verifyToken(token);
        req.body = decode;
        // console.log(req);
        // console.log("Decode",decode);
        next();
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({message:'Token expired. login'});
        }
        return res.status(401).json({message:"Invalid Token"});
    }
};