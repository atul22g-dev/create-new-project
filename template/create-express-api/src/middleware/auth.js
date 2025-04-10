/**
 * Authentication middleware
 */
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

/**
 * Verify JWT token middleware
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authenticate = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(createError(401, 'Authentication required'));
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user info to request
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(createError(401, 'Token expired'));
    }

    if (error.name === 'JsonWebTokenError') {
      return next(createError(401, 'Invalid token'));
    }

    next(createError(500, 'Authentication error'));
  }
};

/**
 * Check if user has Admin role
 * @returns {Function} Middleware function
 */
const authorize = (req, res, next) => {
  if (!req.user) {
    return next(createError(401, 'Authentication required'));
  }

  const userRoles = req.user.roles.includes('admin');
  if(!userRoles){
    return next(createError(403, 'Insufficient permissions'));
  }

  next();
};

/**
 * Check if token in id
 * @returns {Function} Middleware function
 */
const checkToken = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(createError(401, 'Invalid token'));
  }

  next();
};


export {
  authenticate,
  authorize,
  checkToken
};
