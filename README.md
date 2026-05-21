# Fullstack Login System

A simple fullstack authentication example with a React + Redux Toolkit client and an Express + Prisma + PostgreSQL server.

## Features

- User registration and login
- JWT-based authentication
- Protected `/me` endpoint
- Password hashing with `bcrypt`
- Input validation using `zod`
- React Router client routing
- Redux Toolkit async thunks for auth flow

## Tech stack

- Frontend: React, TypeScript, Vite, Redux Toolkit, React Router DOM, Axios
- Backend: Express, TypeScript, Prisma, PostgreSQL, JWT, bcrypt, Zod

## Repo structure

- `client/` — React application
- `server/` — Express API server
- `server/prisma/` — Prisma schema and migrations

## Setup

### Server

1. Install dependencies

```bash
cd server
npm install
```

2. Add a `.env` file at `server/.env` with at least:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
PORT=5000
```

3. Run the server

```bash
npm run dev
```

### Client

1. Install dependencies

```bash
cd client
npm install
```

2. Run the client

```bash
npm run dev
```

## API Endpoints

### `POST /api/auth/register`

Register a new user.

Request body:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### `POST /api/auth/login`

Login and receive a JWT.

Request body:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Response includes:

- `token`
- `user` info

### `GET /api/auth/me`

Protected endpoint that returns the current authenticated user.

Requires header:

```http
Authorization: Bearer <token>
```

## Notes

- The client stores the JWT in `localStorage`.
- The server middleware `authenticateToken` verifies the JWT and attaches the decoded user payload to `req.user`.
- `registerUser` and `loginUser` are implemented in `server/src/services/auth.service.ts`.
- The protected route in the client is defined by `ProtectedRoute` in `client/src/pages/ProtectedRoute.tsx`.

## Useful commands

```bash
# Start server from repo root
cd server && npm run dev

# Start client from repo root
cd client && npm run dev
```

If you want, I can also add a small `README` section for how to run Prisma migrations or how to structure the `client/src` folders.
