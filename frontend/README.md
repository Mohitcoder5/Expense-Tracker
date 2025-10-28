# Vexa - Full-Stack MERN Expense Tracker

Vexa is a complete full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to track their incomes and expenses through a clean, responsive user interface, providing a clear overview of their financial health.

This project features full CRUD (Create, Read, Update, Delete) functionality, a visual dashboard with charts, and a modern UI styled with TailwindCSS.

![]

## ✨ Key Features

* **Full CRUD for Incomes:** Add, view, update, and delete income sources.
* **Full CRUD for Expenses:** Add, view, update, and delete expenses.
* **Real-time Balance Calculation:** Instantly see your total income, total expenses, and net balance.
* **Visual Dashboard:** An interactive pie chart breaks down expenses by category for easy analysis.
* **Responsive UI:** A clean, modern interface built with TailwindCSS that works on all device sizes.
* **Interactive Edit Modal:** A seamless pop-up modal for editing any transaction.

## 🛠️ Tech Stack

* **Frontend:**
    * **React.js** (with Vite)
    * **React Hooks** (for state management)
    * **Axios** (for API requests)
    * **Recharts** (for the expense summary chart)
    * **TailwindCSS** (for styling)
* **Backend:**
    * **Node.js**
    * **Express.js** (for routing and middleware)
    * **MongoDB** (with Mongoose for data modeling)
    * **`dotenv`** (for environment variables)
    * **`cors`** (for cross-origin requests)

## 📁 Project Structure

The project is organized into two main folders: `backend` and `frontend`.

/Vexa ├── /backend │ ├── /config (db.js) │ ├── /controllers (income.js, expense.js) │ ├── /models (Income.js, Expense.js) │ ├── /routes (incomes.js, expenses.js) │ ├── .env (Contains environment variables) │ ├── index.js (Main server file) │ └── package.json │ └── /frontend ├── /src │ ├── /components (Balance.jsx, ExpenseChart.jsx, EditModal.jsx, etc.) │ ├── App.jsx (Main app component) │ ├── main.jsx (React entry point) │ └── index.css (Tailwind directives) ├── package.json └── tailwind.config.js


## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

* **Node.js** (v18 or later)
* **MongoDB** (a local installation or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) URI string)

### 1. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the `backend` folder and add your MongoDB connection string:
    ```
    MONGO_URI=your_mongodb_connection_string_here
    PORT=5000
    ```
4.  **Start the backend server:**
    ```bash
    npm run dev
    ```
    The server will be running on `http://localhost:5000`.

### 2. Frontend Setup

1.  **Open a new terminal** and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Install `recharts`** (if not already installed):
    ```bash
    npm install recharts
    ```
4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The React app will open and run on `http://localhost:5173` (or a similar port).

## 📝 API Endpoints

The backend provides the following RESTful API endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/add-income` | Add a new income. |
| `GET` | `/api/v1/get-incomes` | Get all incomes. |
| `DELETE` | `/api/v1/delete-income/:id` | Delete an income by ID. |
| `PUT` | `/api/v1/update-income/:id` | Update an income by ID. |
| `POST` | `/api/v1/add-expense` | Add a new expense. |
| `GET` | `/api/v1/get-expenses` | Get all expenses. |
| `DELETE` | `/api/v1/delete-expense/:id`| Delete an expense by ID. |
| `PUT` | `/api/v1/update-expense/:id` | Update an expense by ID. |

## 🧑‍💻 Author

* **Mohit Patil**