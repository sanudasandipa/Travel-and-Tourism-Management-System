# Travel and Tourism Management System

A full-stack MERN-based web application for managing operations in a travel and tourism business. The system combines multiple functional modules in one platform, including user authentication, HR workflows, tour packages, transport booking, payment handling, support messaging, and customer reviews.

## Project Overview

This project is structured as:

- `frontend/`: React application (client UI)
- `backend/`: Node.js + Express API server
- `backend/model/`: MongoDB/Mongoose models by module
- `backend/routes/`: API routes by module

The frontend communicates with the backend API running on `http://localhost:8080`, and the backend connects to MongoDB using an environment variable.

## Main Features

- User sign up, sign in, token validation, and logout
- Human Resource module:
	- Employee management
	- Loan management
	- Payroll management
- Tour Package module:
	- Add, update, view, and delete package-related records
- Transport module:
	- Vehicle management
	- Booking management
- Payment module:
	- Customer payment records
	- Online and offline payment flows
- Support module:
	- Contact submissions
	- Article management
	- Message communication
- Review module:
	- Add, view, update, and remove user reviews/feedback

## Tech Stack

- Frontend: React, React Router, Axios, Bootstrap, Ant Design
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Authentication/Security: JWT, bcrypt, cookie-parser, CORS

## Prerequisites

Make sure the following are installed:

- Node.js (LTS recommended)
- npm
- MongoDB (local instance or MongoDB Atlas)

## Environment Variables

Create a `.env` file inside `backend/` and add:

```env
MONGODBURL=<your_mongodb_connection_string>
PORT=8080
```

Notes:

- `PORT` is optional because the backend already defaults to `8080`.
- The frontend currently uses hardcoded API URLs targeting `http://localhost:8080`.

## Installation

Clone the repository and install dependencies for both apps.

```bash
git clone https://github.com/sanudasandipa/Travel-and-Tourism-Management-System.git
cd Travel-and-Tourism-Management-System

cd backend
npm install

cd ../frontend
npm install --legacy-peer-deps
```

## Run the Application

Open two terminals:

1. Start backend

```bash
cd backend
npm run dev
```

2. Start frontend

```bash
cd frontend
npm start
```

Then open:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080`

## Available Scripts

Backend (`backend/package.json`):

- `npm start` - Run server with Node.js
- `npm run dev` - Run server with Nodemon

Frontend (`frontend/package.json`):

- `npm start` - Start React development server
- `npm run build` - Build production bundle
- `npm test` - Run tests

## API Route Groups

Backend route prefixes include:

- `/auth`
- `/employee`, `/loan`, `/payroll`
- `/packages`
- `/api/vehicles`, `/api/bookings`
- `/customer_payment_details`, `/onlinepayment`, `/offlinepayment`
- `/contact`, `/articles`, `/messages`
- `/userReview`

## Screenshots

![Screenshot 1](https://imagetolink.com/ib/Ts5penUP4G.jpeg)
![Screenshot 2](https://imagetolink.com/ib/XLcM8PkaiP.jpeg)
![Screenshot 3](https://imagetolink.com/ib/BGARMmKDYA.jpeg)
![Screenshot 4](https://imagetolink.com/ib/66IngazJ8F.jpeg)
![Screenshot 5](https://imagetolink.com/ib/R7eHioM8sW.jpeg)

## Contributors

- [Financial Management](https://github.com/PulniSL)
- [Human Resource Management](https://github.com/MARASINGHAGEPIUMIBHAGYA)
- [Tour Package Management](https://github.com/SandupamaSRS)
- [Support and Contact Us Management](https://github.com/malmiwithanage)
- [Transport Booking Management](https://github.com/sanudasandipa)
- [Feedback Management](https://github.com/it22542342)

