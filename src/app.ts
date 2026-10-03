import express from 'express';
import cookieParser from 'cookie-parser';
import logger from "./middleware/logger";
import { notFound, errorHandler } from './middleware/errorMiddleware'; 
import { apiLimiter, authLimiter } from './middleware/rateLimiter';
import authRoutes from './routes/authRoutes';

const app = express();

// Apply global rate limiting
app.use(apiLimiter);

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// Routes
app.use("/api/auth", authLimiter, authRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;