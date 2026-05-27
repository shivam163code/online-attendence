# Online Attendance Management System

A full-stack attendance platform for admins, teachers, and students built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB, and JWT authentication.

## Features

- Role-based auth for Admin, Teacher, and Student
- Clean modular frontend and backend structure
- Attendance capture with QR token flow
- Admin, teacher, and student dashboards
- Analytics cards and chart components
- Notifications, reports, and export-ready patterns
- Responsive UI with dark/light mode support

## Project Structure

```text
client/
server/
```

## Prerequisites

- Node.js 18+
- MongoDB Atlas or local MongoDB

## Install

```bash
npm install
npm install --workspace client
npm install --workspace server
```

## Environment Variables

Create a `.env` file inside `server/` using the example below:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/attendance_db
JWT_SECRET=replace_with_a_long_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=secret
SMTP_FROM=Attendance System <no-reply@example.com>
```

Create a `.env` file inside `client/` if you want to override the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

If you do not create a `server/.env` file, the backend will fall back to local-development defaults for MongoDB and JWT.

## Run Locally

```bash
npm run dev
```

This starts the Express API and the Vite frontend together from the root workspace.

## Notes

- The backend is structured with controllers, services, repositories, middleware, and validators.
- The frontend uses protected routes and role-based dashboards.
- QR attendance, reports, and notifications are implemented in a production-friendly scaffold that can be extended with real devices and email providers.
