// src/components/IncomeForm.jsx

import React, { useState, useEffect } from 'react';

const incomeCategorySuggestions = [
  'Salary',
  'Bonus',
  'Interest',
  'Dividends',
  'Freelance',
  'Rental',
  'Reimbursement',
  'Gift',
  'Investment',
  'Other',
];

function IncomeForm({ onAddIncome }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Default date to today (optional)
  useEffect(() => {
    if (!date) setDate(new Date().toISOString().split('T')[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = (fields = {}) => {
    const vals = { title, amount, date, category, ...fields };
    const next = {};
    if (!vals.title?.trim()) next.title = 'Title is required.';
    if (!vals.amount || isNaN(vals.amount) || +vals.amount <= 0)
      next.amount = 'Enter a valid positive amount.';
    if (!vals.date) next.date = 'Date is required.';
    if (!vals.category?.trim()) next.category = 'Category is required.';
    return next;
  };

  const handleBlur = (field, value) => {
    const fieldErrs = validate({ [field]: value });
    setErrors((prev) => ({ ...prev, [field]: fieldErrs[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    const newIncome = {
      title: title.trim(),
      amount: +parseFloat(amount),
      date,
      category: category.trim(),
      description: description.trim(),
    };

    try {
      setLoading(true);
      await Promise.resolve(onAddIncome(newIncome)); // supports sync or async
      setSuccess(true);

      // Clear form
      setTitle('');
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setCategory('');
      setDescription('');
      setErrors({});

      setTimeout(() => setSuccess(false), 1200);
    } catch (err) {
      setFormError('Failed to add income. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    'p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 ' +
    'focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow';
  const invalidRing = 'ring-2 ring-red-500';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 border border-gray-700 p-6 md:p-8 rounded-xl shadow-inner animate-fade-in-up"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-indigo-300">Add New Income</h3>
        {success && <span className="text-emerald-400 text-sm font-medium animate-pop">✓ Saved</span>}
      </div>

      {formError && <p className="text-red-400 text-sm mb-3 animate-pop">{formError}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Title"
          aria-label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => handleBlur('title', e.target.value)}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'err-title' : undefined}
          className={`${inputBase} ${errors.title ? invalidRing : ''}`}
        />

        {/* Amount with ₹ prefix */}
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
          <input
            type="number"
            inputMode="decimal"
            min="0.01"
            step="0.01"
            placeholder="Amount"
            aria-label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onBlur={(e) => handleBlur('amount', e.target.value)}
            onWheel={(e) => e.currentTarget.blur()} // prevent accidental scroll changes
            aria-invalid={!!errors.amount}
            aria-describedby={errors.amount ? 'err-amount' : undefined}
            className={`${inputBase} pl-7 w-full ${errors.amount ? invalidRing : ''}`}
          />
        </div>

        <input
          type="date"
          aria-label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={(e) => handleBlur('date', e.target.value)}
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? 'err-date' : undefined}
          className={`${inputBase} ${errors.date ? invalidRing : ''}`}
        />

        {/* Category with suggestions */}
        <input
          type="text"
          placeholder="Category (e.g., Salary, Bonus)"
          aria-label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onBlur={(e) => handleBlur('category', e.target.value)}
          list="income-categories"
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? 'err-category' : undefined}
          className={`${inputBase} ${errors.category ? invalidRing : ''}`}
        />
        <datalist id="income-categories">
          {incomeCategorySuggestions.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        <textarea
          placeholder="Description (Optional)"
          aria-label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputBase} md:col-span-2`}
          rows="2"
        />
      </div>

      {/* Inline field errors */}
      <div className="mt-2 space-y-1 text-sm">
        {errors.title && <p id="err-title" className="text-red-400">{errors.title}</p>}
        {errors.amount && <p id="err-amount" className="text-red-400">{errors.amount}</p>}
        {errors.date && <p id="err-date" className="text-red-400">{errors.date}</p>}
        {errors.category && <p id="err-category" className="text-red-400">{errors.category}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed
                   text-white font-semibold py-2 px-4 rounded-md mt-4 shadow-sm shadow-indigo-900/20
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transition-colors"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
            Adding...
          </span>
        ) : (
          'Add Income'
        )}
      </button>
    </form>
  );
}

export default IncomeForm;