import express from "express";
import { customerAuthentication } from "../middleware/auth.js";
import { amountTransfer, getAccountDetails, getTransactions, getUser } from "../controller/customerController.js";
import { validateTransferFundDetails } from "../middleware/inputValidation.js";


export const router = express.Router();


router.get('/', customerAuthentication, getAccountDetails);
router.get('/statements/:accountNumber', customerAuthentication, getTransactions);
router.post('/transferfund', customerAuthentication, validateTransferFundDetails, amountTransfer);
router.get('/user/:id', getUser);