
.Multi-Tenant SaaS Notes Application

A simple cloud-based Notes application where multiple tenants and
their employees can create, view, and manage notes. All users within
a tenant can access shared notes, while data remains isolated between
tenants.

.Setup

1.Clone the repository:
git clone
https://github.com/RajaBhagat83/Multi-tenant-SaaS-Notes-Application.git

2**. Install dependencies:**

cd server

npm install

node app.js

cd …/client/frontend

npm install

npm run dev

3.Copy .env.example to .env and fill in your MongoDB URI and JWT secret.

.Features

Multi-tenant architecture

User authentication with JWT

CRUD operations for notes

Role-based access (admin/user)

Free and Pro plan with upgrade functionality

.Tech Stack

Frontend: React, Tailwind CSS, Vite (deployed on Vercel)

Backend: Node.js, Express (deployed on AWS Lambda as serverless
functions)

Database: MongoDB Atlas

.Structure

frontend/ # React app
server/
├─ controllers/ # Route handlers
├─ db/ # MongoDB connection
├─ middleware/ # Auth, error handling, etc.
├─ models/ # Mongoose models
├─ routes/ # Express routes
└─ app.js # Express app entry point


.API Endpoints

Endpoint Method Description

/api/auth/login POST           User login, returns JWT

/api/notes GET/POST            Fetch or create notes

/api/notes/:id PUT/DELETE      Update or delete a note

/api/slug/upgrade POST         Upgrade tenant plan

