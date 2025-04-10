/**
 * Application Configuration
 */
const config = {
  // Database
  db: {
    options: {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }
  },

  // CORS
  corsOptions: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};

export default config;
