# README.md

# Next.js Prisma Login

This project is a Next.js application that implements a login system using Prisma and PostgreSQL. It provides a simple authentication mechanism and serves as a foundation for building more complex applications.

## Features

- User authentication with NextAuth.js
- PostgreSQL database integration using Prisma
- API routes for login and user management
- Customizable styles with global CSS

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- PostgreSQL database

### Installation

1. Clone the repository:

   git clone https://github.com/yourusername/nextjs-prisma-login.git

2. Navigate to the project directory:

   cd nextjs-prisma-login

3. Install the dependencies:

   npm install

4. Set up your PostgreSQL database and update the `.env` file with your database connection string:

   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

5. Run the Prisma migrations to set up the database schema:

   npx prisma migrate dev --name init

### Running the Application

To start the development server, run:

npm run dev

The application will be available at `http://localhost:3000`.

### API Endpoints

- `POST /api/auth/login`: Handles user login requests.
- `GET /api/hello`: A simple API route for testing.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.