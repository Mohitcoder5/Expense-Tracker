// src/components/TransactionList.jsx

import React, { useMemo } from 'react';
import TransactionItem from './TransactionItem';

// Add onEditIncome and onEditExpense
function TransactionList({
  incomes = [],
  expenses = [],
  onDeleteIncome,
  onDeleteExpense,
  onEditIncome,
  onEditExpense,
}) {
  const incomeStats = useMemo(() => {
    const total = incomes.reduce((sum, i) => sum + Number(i.amount || 0), 0);
    return { count: incomes.length, total };
  }, [incomes]);

  const expenseStats = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    return { count: expenses.length, total };
  }, [expenses]);

  const formatCurrency = (n = 0) => `₹${Number(n).toFixed(2)}`;

  return (
    <section className="mt-8 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
        Transaction History
      </h2>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Income List */}
        <div
          className="bg-gray-900 border border-gray-700 rounded-xl shadow-inner p-4 animate-fade-in-up"
          style={{ animationDelay: '40ms' }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-green-300">Incomes</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-gray-300">
                {incomeStats.count} items
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-300 border border-green-500/20">
                {formatCurrency(incomeStats.total)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {incomes.length > 0 ? (
              incomes.map((income) => (
                <TransactionItem
                  key={income._id}
                  transaction={income}
                  onDelete={onDeleteIncome}
                  onEdit={onEditIncome}
                  type="income"
                />
              ))
            ) : (
              <div className="text-gray-400 text-sm bg-gray-800/60 border border-gray-700 rounded-lg p-4 text-center">
                No income added yet.
              </div>
            )}
          </div>
        </div>

        {/* Expense List */}
        <div
          className="bg-gray-900 border border-gray-700 rounded-xl shadow-inner p-4 animate-fade-in-up"
          style={{ animationDelay: '80ms' }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-red-300">Expenses</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 border border-gray-700 text-gray-300">
                {expenseStats.count} items
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/20">
                {formatCurrency(expenseStats.total)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <TransactionItem
                  key={expense._id}
                  transaction={expense}
                  onDelete={onDeleteExpense}
                  onEdit={onEditExpense}
                  type="expense"
                />
              ))
            ) : (
              <div className="text-gray-400 text-sm bg-gray-800/60 border border-gray-700 rounded-lg p-4 text-center">
                No expenses added yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TransactionList;