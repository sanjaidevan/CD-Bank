import express from "express";
import { customerAuthentication } from "../middleware/auth.js";
import { sampleCustomers } from "../SampleData/sampleCustomer.js";

export const router = express.Router();

router.post('/',customerAuthentication)