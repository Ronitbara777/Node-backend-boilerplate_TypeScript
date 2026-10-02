const express=require("express");
const cookieParser=require('cookie-parser');

const logger=require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { apiLimiter, authLimiter } = require("./middleware/rateLimiter");
const authRoutes = require("./routes/authRoutes");

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

module.exports=app;