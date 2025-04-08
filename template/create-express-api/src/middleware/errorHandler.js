/**
 * Error handling middleware
 */
import { ValidationError } from 'express-validator';
import logger from '../utils/logger.js';

/**
 * Custom error handler middleware
 * @param {Object} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Default error status and message
  let statusCode = err.status || err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = [];

  // Handle validation errors
  if (err.array && typeof err.array === 'function') {
    // Express validator errors
    statusCode = 400;
    message = 'Validation Error';
    errors = err.array().map(error => ({
      param: error.param,
      msg: error.msg,
      value: error.value
    }));
  } else if (err.name === 'MongoError' && err.code === 11000) {
    // MongoDB duplicate key error
    statusCode = 409;
    message = 'Duplicate key error';
  } else if (err.name === 'CastError') {
    // MongoDB cast error
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Log error
  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, {
    error: err.stack,
    body: req.body,
    params: req.params,
    query: req.query
  });

  // Send response
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    errors: errors.length > 0 ? errors : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorHandler;
