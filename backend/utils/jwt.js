import jwt from 'jsonwebtoken';
import 'dotenv/config'

const JWTSECRET = process.env.JWT_SECRET || "No JWT Token Found";
const JWTEXPIRES = '1h';

export const signToken = (payload) => {
    return jwt.sign(payload, JWTSECRET, { expiresIn: JWTEXPIRES });
};

export const verifyToken = (token) => {
    return jwt.verify(token, JWTSECRET);
};