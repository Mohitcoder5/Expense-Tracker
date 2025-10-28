// index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenses');
const incomeRoutes = require('./routes/incomes'); 

// 1. Initialize the app
const app = express();
connectDB(); // Connect to Database
const PORT = process.env.PORT || 5000;
 
// 2. Middleware

app.use(cors());           
app.use(express.json()); 

// Mount the routes
app.use('/api/v1', expenseRoutes);
app.use('/api/v1', incomeRoutes);

// 3. Test Route
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running!');
});

// 4. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});