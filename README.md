# Create New Project CLI Tool for Node.js Applications

A powerful CLI tool to generate production-ready projects with best practices and essential dependencies.

## Features

### Currently Supported Project Types

- **Express.js API**: A production-ready Express.js API with all the essentials

### Express.js API Features

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

## Installation

### Global Installation

```bash
npm install -g @atul.dev/create-new-project
```

### Using npx

```bash
npx @atul.dev/create-new-project
```

## Usage

```bash
npx @atul.dev/create-new-project
```

Follow the interactive prompts to configure your application:

- Project name
- Project description
- Package manager preference (npm or yarn)

## Project Structure

The generated application follows a well-organized structure:

```
.
├── src/
│   ├── config/         # Application configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # Application routes
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

## Available Scripts

The generated application includes the following npm scripts:

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reloading
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Dependencies

### Main Dependencies

- express - Fast, unopinionated, minimalist web framework
- mongoose - MongoDB object modeling
- cors - CORS middleware
- helmet - Security headers middleware
- morgan - HTTP request logger
- winston - Logging library
- dotenv - Environment variables
- jsonwebtoken - JWT implementation
- bcryptjs - Password hashing
- express-validator - Request validation
- compression - Response compression
- express-rate-limit - Rate limiting middleware
- http-errors - HTTP error creation

### Development Dependencies

- nodemon - Auto-restart server on changes
- eslint - Code linting
- jest - Testing framework
- supertest - HTTP testing

## Roadmap

Future plans for this project include adding support for more project types:

- React.js applications
- Vue.js applications
- Next.js applications
- Full-stack applications
- And more!

Feel free to contribute or suggest new project templates!

## License

ISC
