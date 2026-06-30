import express from 'express';
import { commonErrorHandler } from './middleware/errorHandler.js';
import { router } from './routes/customerRoutes.js';
import cors from 'cors';
import { authRouter } from './routes/authRoutes.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/api",authRouter);
app.use("/api", router);

app.use(commonErrorHandler);