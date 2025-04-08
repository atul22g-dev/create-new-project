/**
 * API routes
 */
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

/**
 * @route   GET /api
 * @desc    API information
 * @access  Public
 */
router.get('/', (req, res) => {
  res.json({
    message: 'API v1',
    endpoints: [
      {
        path: '/api/users',
        methods: ['GET', 'POST'],
        description: 'User management'
      },
      {
        path: '/api/auth',
        methods: ['POST'],
        description: 'Authentication'
      }
    ]
  });
});

/**
 * User routes
 */
router.get('/users', authenticate, userController.getAllUsers);
router.get('/users/:id', authenticate, userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', authenticate, userController.updateUser);
router.delete('/users/:id', authenticate, userController.deleteUser);

/**
 * Authentication routes
 */
router.post('/auth/login', userController.login);
router.post('/auth/register', userController.register);
router.post('/auth/refresh-token', userController.refreshToken);

export default router;