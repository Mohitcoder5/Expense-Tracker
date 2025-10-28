// src/components/EditModal.jsx
import React, { useState, useEffect, useRef } from 'react';

// Helper to format date for input type="date" (YYYY-MM-DD)
const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

function EditModal({ transaction, onUpdate, onClose, type }) {
  // --- Form State ---
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Animations / UX
  const [isClosing, setIsClosing] = useState(false);
  const titleRef = useRef(null);

  // --- Pre-fill form when 'transaction' prop changes ---
  useEffect(() => {
    if (transaction) {
      setTitle(transaction.title ?? '');
      setAmount(transaction.amount ?? '');
      setDate(formatDateForInput(transaction.date));
      setCategory(transaction.category ?? '');
      setDescription(transaction.description || '');
      // focus title on open
      setTimeout(() => titleRef.current?.focus(), 0);
    }
  }, [transaction]); // Re-run when the transaction prop is updated

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!transaction) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [transaction]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') requestClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!transaction) return null; // Don't render if no transaction is selected

  const requestClose = () => {
    setIsClosing(true);
    // Wait for exit animation before unmount
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 220);
  };

  // --- Handle Form Submit ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title || !amount || !date || !category) {
      setError('Please fill in Title, Amount, Date, and Category.');
      return;
    }
    if (+amount <= 0) {
      setError('Amount must be a positive number.');
      return;
    }

    const updatedTransaction = {
      ...transaction, // Keep the original _id and other fields
      title: title.trim(),
      amount: +amount,
      date,
      category: category.trim(),
      description: description.trim(),
    };

    onUpdate(updatedTransaction);
    // Optional: close after update. Uncomment if desired:
    // requestClose();
  };

  const titleId = 'edit-modal-title';

  return (
    // Modal Backdrop
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50
        ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={requestClose} // Close modal if backdrop is clicked
    >
      {/* Modal Content */}
      <div
        className={`w-full max-w-lg mx-4 sm:mx-0 bg-gray-900 text-gray-100 p-6 md:p-8 rounded-xl
          border border-gray-700 shadow-2xl shadow-black/40
          ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}`}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click from firing
      >
        <div className="flex items-start justify-between mb-6">
          <h2 id={titleId} className="text-2xl font-bold text-indigo-400">
            Edit {type === 'income' ? 'Income' : 'Expense'}
          </h2>
          <button
            type="button"
            onClick={requestClose}
            className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-md
                       text-gray-300 hover:text-white hover:bg-white/5
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-3 animate-pop">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              ref={titleRef}
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="number"
              inputMode="decimal"
              min="0.01"
              step="0.01"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Description (Optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 md:col-span-2
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={requestClose}
              className="bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700
                         font-medium py-2 px-4 rounded-md transition-colors
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md
                         shadow-sm shadow-indigo-900/20 transition-colors
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;