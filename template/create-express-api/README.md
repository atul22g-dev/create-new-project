# Express.js Application

This is a robust Express.js application template with best practices and essential dependencies.

## Features

- 🚀 Modern JavaScript (ES6+)
- 🔒 Security with Helmet, CORS, and rate limiting
- 📝 Request validation with express-validator
- 🔑 Authentication with JWT
- 🗄️  Mongoose
- 🧪 Testing wiMongoDB integration withth Jest
- 🔄 Hot reloading for development
- 🌐 Environment Configuration with dotenv

## Project Structure

```
.
├── src/
│   ├── Config/         # Application Configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # Application routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── index.js        # Application entry point
├── tests/              # Test files
│   ├── app.test.js   
│   ├── jest.Config.js  
│   └── package.json
├── .env.example        # Environment variables example
├── .gitignore          # Git ignore file
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
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## API Endpoints

### Public Routes

- `GET /` - Welcome message
- `GET /health` - Health check
- `POST /api/auth/login` - User login
Request Body:

```json
{
  "email": "john@example.com",
  "password": "Your@pa55word"
}
```
- `POST /api/auth/register` - User registration
Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Your@pa55word"
}
```
- `GET /api/auth/profile` - Get user profile
Request Headers:

```json
{
  "Authorization": "Bearer <token>"
}
```
- `GET /api/auth/refresh-token` - Refresh JWT token



### Protected Routes (Require Authentication and Admin Role and Your Data)
Request Headers:

```json
{
  "Authorization": "Bearer <token>" // JWT token of Admin or User 
}
```

- `Post /api/users` - Create users only Admin
Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Your@pa55word",
  "roles": "admin" // admin or user
}
```
- `GET /api/users` - Get all users
- `GET /api/user/:id` - Get user by ID only Your Data
Request Url:
```
http://localhost:3000/api/user/67f6db683faf24a4c0fe1a12
```

- `PUT /api/user/:id` - Update Data only Your Data 
Request Url:
```
http://localhost:3000/api/user/67f6db683faf24a4c0fe1a12
```

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Your@pa55word"
}
```
- `DELETE /api/users/:id` - Delete user only Your Data
Request Url:
```
http://localhost:3000/api/user/67f6db683faf24a4c0fe1a12
```

- `DELETE /api/users/` - Delete users by name only Admin
Request Body:

```json
{
  "name": "test0"
}
```

## License

ISC