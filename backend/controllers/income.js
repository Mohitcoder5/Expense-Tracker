// controllers/income.js
const Income = require('../models/Income.js');

// --- 1. ADD INCOME ---
exports.addIncome = async (req, res) => {
    const { title, amount, category, date, description } = req.body;
    if (!title || !category || !date || !amount) {
        return res.status(400).json({ message: 'Title, Category, Date, and Amount are required.' });
    }
    if (amount <= 0 || typeof amount !== 'number') {
        return res.status(400).json({ message: 'Amount must be a positive number.' });
    }
    const income = new Income({ title, amount, category, date, description });
    try {
        await income.save();
        res.status(200).json({ message: 'Income Added Successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not add income.' });
    }
};

// --- 2. GET INCOMES ---
exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not fetch incomes.' });
    }
};

// --- 3. DELETE INCOME ---
exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await Income.findById(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found.' });
        }
        await income.deleteOne();
        res.status(200).json({ message: 'Income Deleted Successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not delete income.' });
    }
};

// --- 4. UPDATE INCOME ---
exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, date, description } = req.body;
    try {
        const income = await Income.findById(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found.' });
        }
        if (!title || !category || !date || !amount) {
            return res.status(400).json({ message: 'Title, Category, Date, and Amount are required.' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number.' });
        }

        income.title = title;
        income.amount = amount;
        income.category = category;
        income.date = date;
        income.description = description;

        await income.save();
        res.status(200).json({ message: 'Income Updated Successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: Could not update income.' });
    }
};