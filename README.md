# Zero Trust Authentication System

This project is a full-stack web application that demonstrates the principles of Zero Trust security architecture.

## Core Zero Trust Principles Implemented

- Never Trust, Always Verify
- Role-Based Access Control (RBAC)
- Least Privilege Access
- Session timeout with JWT expiration
- Protected resources secured by authorization headers

## Technology Stack

### Frontend
- Next.js (App Router)
- Tailwind CSS
- Axios
- js-cookie

### Backend
- Node.js
- Express
- JSON Web Tokens (JWT)

## Application Pages

- Landing Page
- Registration Page
- Login Page
- Account Page
- Protected Resource Page
- Admin Panel (admin role only)

## Authentication Flow

1. User registers an account
2. User logs in with credentials
3. Backend issues a JWT token with role and expiration
4. Token is stored in browser cookies
5. Every protected request requires Authorization header
6. Backend verifies token, role, and expiration
7. Access is granted or denied based on RBAC policies

## Security Features

- JWT-based authentication
- Session expiration after 10 minutes
- Role-based access enforcement
- Protected backend API routes
- Automatic logout on token expiration

## How to Run Locally

### Backend
```bash
cd backend
npm install
node server.js
