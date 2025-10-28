// routes/expenses.js
const express = require('express');
const { 
    addExpense, 
    getExpenses, 
    deleteExpense,
    updateExpense 
} = require('../controllers/expense');
const router = express.Router();

// Define the routes
router.post('/add-expense', addExpense);
router.get('/get-expenses', getExpenses);
router.delete('/delete-expense/:id', deleteExpense);
router.put('/update-expense/:id', updateExpense);

module.exports = router; 