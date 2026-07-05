import { fetchCustomerById } from "../services/customerServices.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../utils/jwt.js";

export const customerAuthentication = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "Invalid Header" });
    }
    const token = authHeader.split(" ")[1];
    const decode = verifyToken(token);
    req.customer = decode;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. login" });
    }
    return res.status(401).json({ message: "Invalid Token" });
  }
};
