/**
 * API routes
 */
import express from 'express';
import { authenticate, authorize, checkToken } from '../middleware/auth.js';
import * as userController from '../controllers/userController.js';
import { createUserValidation, loginValidation, registerValidation } from '../middleware/validators.js';

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
router.get('/users', authenticate, authorize, userController.getAllUsers);
router.get('/user/:id', authenticate, checkToken, userController.getUserById);
router.post('/user', authenticate, authorize, createUserValidation, userController.createUser);
router.put('/user/:id', authenticate, checkToken, userController.updateUser);
router.delete('/user/:id', authenticate, checkToken, userController.deleteUser);
router.delete('/user/', authenticate, authorize, userController.deleteUserByName); // Delete User by Name

/**
 * Authentication routes
 */
router.post('/auth/login', loginValidation, userController.login);
router.post('/auth/register', registerValidation, userController.register);
router.get('/auth/profile', authenticate, userController.getUserData);
router.get('/auth/refresh-token', userController.refreshToken);

export default router;