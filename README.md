# Zero Trust Authentication API

A backend-focused academic project demonstrating core **Zero Trust authentication principles** using **Node.js**, **Express.js**, **JWT**, **bcrypt password hashing**, protected routes and role-based access control.

This project was created to practice secure API access, token-based authentication and least privilege authorization logic.

---

## Project Purpose

The main goal of this project is to show how a backend API can protect private resources using Zero Trust principles:

* never trust requests by default;
* require authentication for protected data;
* validate JWT tokens on every protected request;
* restrict access based on user roles;
* use short session expiration;
* protect admin-only resources from regular users.

---

## Features

* User registration
* User login
* Password hashing with bcryptjs
* JWT token generation
* Token expiration after 10 minutes
* Protected route access
* Admin-only route access
* Role-based access control
* Middleware for token validation
* Basic CORS support
* In-memory user storage for academic demonstration

---

## Tech Stack

* Node.js
* Express.js
* JSON Web Token
* bcryptjs
* CORS

---

## API Endpoints

### Register

```http
POST /register
```

Request body:

```json
{
  "username": "testuser",
  "password": "test123"
}
```

Response:

```json
{
  "message": "Registered successfully"
}
```

---

### Login

```http
POST /login
```

Request body:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "role": "admin"
}
```

---

### Protected Route

```http
GET /protected
```

Requires:

```http
Authorization: Bearer <token>
```

Response:

```json
{
  "message": "You are inside protected data",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

---

### Admin Route

```http
GET /admin
```

Requires an admin JWT token.

Regular users receive:

```json
{
  "error": "Forbidden"
}
```

---

### Account Route

```http
GET /account
```

Requires a valid JWT token.

---

## Test Results

The API was tested locally through PowerShell requests.

Confirmed behavior:

* Admin can log in successfully.
* Admin receives a JWT token.
* Protected route works only with a valid token.
* Admin route works only for users with the `admin` role.
* Regular users cannot access the admin route.
* Regular users receive `Forbidden` when trying to access `/admin`.

---

## How to Run Locally

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

---

## Example Test Commands

### Login as admin

```powershell
$login = Invoke-RestMethod `
  -Method POST `
  -Uri http://localhost:5000/login `
  -ContentType "application/json" `
  -Body '{"username":"admin","password":"admin123"}'

$token = $login.token
```

### Open protected route

```powershell
Invoke-RestMethod `
  -Method GET `
  -Uri http://localhost:5000/protected `
  -Headers @{ Authorization = "Bearer $token" }
```

### Open admin route

```powershell
Invoke-RestMethod `
  -Method GET `
  -Uri http://localhost:5000/admin `
  -Headers @{ Authorization = "Bearer $token" }
```

---

## Default Test User

```text
Username: admin
Password: admin123
Role: admin
```

---

## Security Notes

This is an academic demonstration project.
For production use, the following improvements are required:

* move JWT secret to environment variables;
* add `.env.example`;
* use a real database instead of in-memory storage;
* improve validation;
* add refresh token logic;
* add rate limiting;
* add request logging;
* add HTTPS deployment;
* add automated tests.

---

## Status

This project is functional as a backend authentication API demo.
It is not a full-stack application. The focus is on backend authentication, JWT validation, protected routes and role-based access control.
