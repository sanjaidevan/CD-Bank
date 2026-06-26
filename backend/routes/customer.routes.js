import express from "express";
import { customerAuthentication } from "../middleware/auth.js";
import { sampleCustomers } from "../SampleData/sampleCustomer.js";
import { amountTransfer, getAccountDetails, getTransactions } from "../controller/customer.controller.js";

export const router = express.Router();

router.post('/', customerAuthentication, getAccountDetails);
router.post('/statements', customerAuthentication, getTransactions);
router.post('/transferfund', customerAuthentication, amountTransfer);