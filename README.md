# Task Management Application (Torus Innotech Assignment)

This is a task management application built using the MERN (MongoDB, Express, React, Node.js) stack as part of the assignment for Torus Innotech Pvt Ltd. The application provides user authentication, task management, task assignment, and the ability to generate task summary reports.

## Features

- **User Authentication**: Secure JWT-based authentication for users.
- **Task Management**: Create, update, and delete tasks with pagination.
- **Task Assignment**: Admin users can assign tasks to other users.
- **Task Summary Reports**: Generate task reports in JSON or CSV format.
- **Responsive Design**: Frontend UI built with React.js to ensure responsiveness across devices.
- **Error Handling**: Comprehensive error handling and input validation.
- **Backend Integration**: Fully integrated with MongoDB for data storage and Express.js for backend logic.

## Technologies Used

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful API using Express
- **Version Control**: Git, GitHub
- **Deployment**: Vercel (Backend), (Frontend deployment details if applicable)

## Installation and Setup

### Prerequisites

- Node.js (v12 or higher)
- MongoDB
- npm (Node Package Manager)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/hzratali/Torus-Innotech---Assignment.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd torus-assignment/backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the `backend` folder and add the following environment variables:

   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. Start the backend server:

   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the frontend server:

   ```bash
   npm start
   ```

## Usage

- **Admin users** can assign tasks to other users, manage tasks, and generate reports.
- **Regular users** can view, manage their own tasks, and mark them as complete.
- The frontend UI provides a simple and responsive interface for managing tasks efficiently.

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Log in a user

### Tasks

- `GET /api/tasks` - Get all tasks (admin only)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Reports

- `GET /api/tasks/report` - Generate task report in CSV or JSON format

## Folder Structure

```
torus-assignment/
│
├── backend/
│   ├── controllers/      # Task and user controller logic
│   ├── models/           # Mongoose models (Task, User)
│   ├── routes/           # API routes (tasks, users)
│   ├── middleware/       # Authentication middleware
│   ├── index.js          # Entry point for the backend server
│   └── ...
├── frontend/
│   ├── src/              # React components and logic
│   ├── public/           # Static assets
│   └── ...
└── README.md             # Project documentation
```

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
