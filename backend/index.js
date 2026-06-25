import express from 'express';
import { commonErrorHandler } from './middleware/error.handler.js';
import { router } from './routes/customer.routes.js';

export const app = express();

app.use(express.json());

app.use("/api", router);

app.use(commonErrorHandler);