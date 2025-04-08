/**
 * Application configuration
 */
const config = {
  // Environment
  env: process.env.NODE_ENV || 'development',

  // Server
  port: process.env.PORT || 3000,

  // Database
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/express-app',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  },

  // CORS
  corsOptions: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  }
};

export default config;
