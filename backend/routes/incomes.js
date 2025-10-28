// routes/incomes.js
const express = require('express');
const { 
    addIncome, 
    getIncomes, 
    deleteIncome,
    updateIncome 
} = require('../controllers/income');
const router = express.Router();

// Define the routes
router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes);
router.delete('/delete-income/:id', deleteIncome);
router.put('/update-income/:id', updateIncome); 

module.exports = router;