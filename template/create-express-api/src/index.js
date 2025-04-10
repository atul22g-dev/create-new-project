/**
 * Main application entry point
 */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import { rateLimit } from 'express-rate-limit';
import logger from './utils/logger.js';
import config from './config/index.js';

import indexRouter from './routes/index.js';
import apiRouter from './routes/api.js';
import connectDB from './config/db.js';


// Load env
logger.info('Load environment variables...');
dotenv.config();

// Init App
const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: config.corsOptions.methods,
  allowedHeaders: config.corsOptions.allowedHeaders
}));

// Rate Limiter
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.'
}));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Compression
app.use(compression());

// Routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

// 404 handler
app.use((req, res, next) => {
  next(createError(404, 'Resource not found'));
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Connect to DB & Start Server
const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    logger.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
  });
};

startServer();

export default app;
