// controllers/expense.js
const Expense = require('../models/Expense.js');

// --- 1. ADD EXPENSE ---
exports.addExpense = async (req, res) => {
    const { title, amount, category, date, description } = req.body;
    if (!title || !category || !date || !amount) {
        return res.status(400).json({ message: 'Title, Category, Date, and Amount are required.' });
    }
    if (amount <= 0 || typeof amount !== 'number') {
        return res.status(400).json({ message: 'Amount must be a positive number.' });
    }
    const expense = new Expense({ title, amount, category, date, description });
    try {
        await expense.save();
        res.status(200).json({ message: 'Expense Added Successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not add expense.' });
    }
};

// --- 2. GET EXPENSES ---
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 }); 
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not fetch expenses.' });
    }
};

// --- 3. DELETE EXPENSE ---
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found.' });
        }
        await expense.deleteOne();
        res.status(200).json({ message: 'Expense Deleted Successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not delete expense.' });
    }
};

// --- 4. UPDATE EXPENSE ---
exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, date, description } = req.body;
    try {
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found.' });
        }
        if (!title || !category || !date || !amount) {
            return res.status(400).json({ message: 'Title, Category, Date, and Amount are required.' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number.' });
        }
        
        expense.title = title;
        expense.amount = amount;
        expense.category = category;
        expense.date = date;
        expense.description = description;

        await expense.save();
        res.status(200).json({ message: 'Expense Updated Successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not update expense.' });
    }
};