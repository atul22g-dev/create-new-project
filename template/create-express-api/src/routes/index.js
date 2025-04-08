/**
 * Main application routes
 */
import express from 'express';
const router = express.Router();

/**
 * @route   GET /
 * @desc    Home route
 * @access  Public
 */
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Express API',
    author: 'Atul Goyal',
    github: 'https://github.com/atual-dev',
    license: 'ISC',
    version: '1.0.0',
    documentation: '/api/docs'
  });
});

/**
 * @route   GET /health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

export default router;