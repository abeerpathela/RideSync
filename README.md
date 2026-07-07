# RideSync - Cab Booking Application

A full-stack MERN application for booking cab rides.

## Features

- User Authentication (Login/Register)
- Role-based Authorization (User, Driver, Admin)
- Book Rides
- View Ride History
- Admin Panel
- Dashboard with Statistics
- Dark Mode
- Responsive Design
- Toast Notifications
- Loading Skeletons
- Search and Filtering
- Pagination
- Profile Management with Image Upload

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Upload)

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- React Toastify

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd RideSync
```

2. Set up backend:
```bash
cd backend
npm install
```

3. Create backend .env file:
```bash
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
```

4. Start backend server:
```bash
npm start
```

5. Set up frontend:
```bash
cd ../frontend
npm install
```

6. Start frontend development server:
```bash
npm run dev
```

## Usage

- Register as a new user
- Login with your credentials
- Book a ride from the dashboard
- View your ride history
- Admin can manage users and rides

## Project Structure

```
RideSync/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── main.jsx
│   └── index.html
└── README.md
```

## License

MIT
