// src/App.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeForm from './components/IncomeForm';
import ExpenseForm from './components/ExpenseForm';
import TransactionList from './components/TransactionList';
import EditModal from './components/EditModal';
import ExpenseChart from './components/ExpenseChart';
import FloatingBackgroundSwitcher from './components/FloatingBackgroundSwitcher'; 

function App() {
  // --- State ---
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [error, setError] = useState(null);

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api/v1';

  // --- Initial Data Fetch ---
  const getAllData = async () => {
    setError(null);
    try {
      const [incomeRes, expenseRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/get-incomes`),
        axios.get(`${API_BASE_URL}/get-expenses`),
      ]);
      setIncomes(incomeRes.data);
      setExpenses(expenseRes.data);
    } catch (err) {
      setError('Could not fetch data. Please ensure the backend server is running.');
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  // --- Calculate Totals ---
  useEffect(() => {
    const newTotalIncome = incomes.reduce((total, income) => total + Number(income.amount || 0), 0);
    const newTotalExpenses = expenses.reduce((total, expense) => total + Number(expense.amount || 0), 0);
    setTotalIncome(newTotalIncome);
    setTotalExpenses(newTotalExpenses);
    setTotalBalance(newTotalIncome - newTotalExpenses);
  }, [incomes, expenses]);

  // --- API Handlers ---
  const addIncome = async (income) => {
    try {
      await axios.post(`${API_BASE_URL}/add-income`, income);
      getAllData();
    } catch (err) {
      setError('Could not add income.');
    }
  };

  const addExpense = async (expense) => {
    try {
      await axios.post(`${API_BASE_URL}/add-expense`, expense);
      getAllData();
    } catch (err) {
      setError('Could not add expense.');
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete-income/${id}`);
      getAllData();
    } catch (err) {
      setError('Could not delete income.');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete-expense/${id}`);
      getAllData();
    } catch (err) {
      setError('Could not delete expense.');
    }
  };

  const updateIncome = async (income) => {
    try {
      await axios.put(`${API_BASE_URL}/update-income/${income._id}`, income);
      handleCloseModal();
      getAllData();
    } catch (err) {
      setError('Could not update income.');
      console.error('Error updating income:', err);
    }
  };

  const updateExpense = async (expense) => {
    try {
      await axios.put(`${API_BASE_URL}/update-expense/${expense._id}`, expense);
      handleCloseModal();
      getAllData();
    } catch (err) {
      setError('Could not update expense.');
      console.error('Error updating expense:', err);
    }
  };

  // --- Modal Control Functions ---
  const handleOpenEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  // Determine which update function to pass to the modal
  const onUpdateHandler = editingTransaction?.type === 'income' ? updateIncome : updateExpense;

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="App max-w-6xl mx-auto p-6 space-y-6">
        <Header />

        {error && (
          <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-lg text-center">
            {error}
          </p>
        )}

        {/* Dashboard Grid (Balance + Chart) */}
        <div className="grid md:grid-cols-2 gap-6">
          <Balance
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            totalBalance={totalBalance}
          />
          <ExpenseChart expenses={expenses} />
        </div>

        {/* Forms Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <IncomeForm onAddIncome={addIncome} />
          <ExpenseForm onAddExpense={addExpense} />
        </div>

        {/* Transaction List Section */}
        <TransactionList
          incomes={incomes}
          expenses={expenses}
          onDeleteIncome={deleteIncome}
          onDeleteExpense={deleteExpense}
          onEditIncome={(transaction) => handleOpenEditModal({ ...transaction, type: 'income' })}
          onEditExpense={(transaction) => handleOpenEditModal({ ...transaction, type: 'expense' })}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <EditModal
          transaction={editingTransaction}
          onClose={handleCloseModal}
          onUpdate={onUpdateHandler}
          type={editingTransaction?.type}
        />
      )}

      {/* Floating background picker */}
      <FloatingBackgroundSwitcher />
    </div>
  );
}

export default App;