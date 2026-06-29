import express from 'express';
import { commonErrorHandler } from './middleware/error.handler.js';
import { router } from './routes/customer.routes.js';
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use(commonErrorHandler);