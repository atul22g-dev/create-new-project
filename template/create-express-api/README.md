# Express.js Application

This is a robust Express.js application template with best practices and essential dependencies.

## Features

- 🚀 Modern JavaScript (ES6+)
- 🔒 Security with Helmet, CORS, and rate limiting
- 📝 Request validation with express-validator
- 🔑 Authentication with JWT
- 📊 Logging with Winston
- 🗄️ MongoDB integration with Mongoose
- 🧪 Testing with Jest and Supertest
- 🔄 Hot reloading for development
- 📏 Code linting with ESLint
- 🌐 Environment configuration with dotenv

## Project Structure

```
.
├── src/
│   ├── config/         # Application configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # Application routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── index.js        # Application entry point
├── tests/              # Test files
├── .env.example        # Environment variables example
├── .eslintrc.js        # ESLint configuration
├── .gitignore          # Git ignore file
├── jest.config.js      # Jest configuration
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (>= 14.0.0)
- npm or yarn
- MongoDB (local or remote)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reloading
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## API Endpoints

### Public Routes

- `GET /` - Welcome message
- `GET /health` - Health check
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Protected Routes (Require Authentication)

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## License

ISC
