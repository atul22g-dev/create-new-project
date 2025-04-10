/**
 * User controller
 */
import { validationResult } from 'express-validator';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

/**
 * User registration
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, 'Email already registered'));
    }

    // Create new user instance
    const user = new User({ name, email, password });

    // Save user to DB (password will be auto-hashed by pre-save middleware)
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      status: 'success',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * User login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    const userExist = await User.findOne({ email }).select('+password');  // fetch password too

    if (!userExist) {
      return next(createError(401, 'Invalid credentials'));
    }

    const isMatch = await userExist.comparePassword(password);

    if (!isMatch) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: userExist._id, name: userExist.name, email: userExist.email, roles: userExist.roles },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      status: 'success',
      message: 'Login successful',
      token,
      user: {
        id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        roles: userExist.roles
      }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Get user data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getUserData = async (req, res, next) => {
  try {
    const user = req.user; // Get user from request object (from authenticate middleware) or from database (if not using JWT)

    res.json({
      status: 'success',
      user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create user By Admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, roles } = req.body;

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, 'Email already registered'));
    }

    // Create new user instance
    const user = new User({ name, email, password, roles });

    // Save user to DB (password will be auto-hashed by pre-save middleware)
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      status: 'success',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const refreshToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(createError(401, 'Authentication required'));
    }

    const refreshToken = authHeader.split(' ')[1];


    if (!refreshToken) {
      return next(createError(400, 'Refresh token is required'));
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return next(createError(403, 'Invalid refresh token'));

      const user = await User.findById(decoded.id);
      if (!user) return next(createError(404, 'User not found'));

      const accessToken = jwt.sign(
        { id: user._id, name: user.name, email: user.email, roles: user.roles },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(200).json({
        success: true,
        accessToken,
      });
    });
  } catch (error) {
    next(error);
  }
};

//! Crud User


/**
 * Get all users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getAllUsers = async (req, res, next) => {
  try {
    // Get users from database
    const users = await User.find({});

    res.json({
      status: 'success',
      data: users
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid user ID'));
    }

    // Get user from database
    const user = await User.findById(id);

    if (!user) {
      return next(createError(404, 'User not found'));
    }

    res.json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid user ID'));
    }

    // Find user
    const user = await User.findById(id);
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    // Save updated user
    await user.save();

    res.json({
      status: 'success',
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid user ID'));
    }

    // Find and delete user
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    res.json({
      status: 'success',
      message: `User deleted successfully`
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete users by matching name pattern (using regex)
 * Example: name = "test0" → will delete test01, test0abc, test099 etc.
 * 
 * @param {Request} req - Express Request
 * @param {Response} res - Express Response
 * @param {Function} next - Express Next Middleware
 */
const deleteUserByName = async (req, res, next) => {
  try {
    const { name } = req.body;

    // Validate name input
    if (!name) {
      return next(createError(400, 'Name is required'));
    }

    // Delete all users where username starts with provided name (case-insensitive)
    const result = await User.deleteMany({
      name: { $regex: new RegExp(`^${name}.*`, 'i') }  // i → ignore case
    });

    // If no users found to delete
    if (result.deletedCount === 0) {
      return next(createError(404, 'No users found to delete'));
    }

    // Success response
    res.json({
      status: 'success',
      message: `${result.deletedCount} user(s) deleted successfully`
    });

  } catch (error) {
    next(error);  // Pass error to error handler middleware
  }
};



export {
  login,
  register,
  getUserData,
  refreshToken,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  deleteUserByName
};
