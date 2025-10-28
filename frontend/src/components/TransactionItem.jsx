// src/components/TransactionItem.jsx

import React from 'react';

// Helper to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatCurrency = (amt) => `₹${Number(amt || 0).toFixed(2)}`;

// 1. Add 'onEdit' to the props
function TransactionItem({ transaction, onDelete, onEdit, type }) {
  const { _id, title, amount, date, category, description } = transaction || {};

  const sign = type === 'income' ? '+' : '-';
  const accentBorder =
    type === 'income' ? 'border-l-green-500' : 'border-l-red-500';
  const amountColor =
    type === 'income' ? 'text-green-400' : 'text-red-400';
  const chipColor =
    type === 'income' ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300';

  return (
    <div
      className={`group flex items-center justify-between gap-4
                  bg-gray-900 p-4 rounded-xl shadow-inner border border-gray-700 ${accentBorder} border-l-4
                  hover:bg-gray-800 hover:shadow-lg hover:shadow-black/20
                  transition-all duration-300 animate-fade-in-up`}
    >
      {/* Clickable left area: quick edit */}
      <div
        className="flex-1 overflow-hidden cursor-pointer outline-none rounded-md
                   focus-visible:ring-2 focus-visible:ring-indigo-400"
        role="button"
        tabIndex={0}
        onClick={() => onEdit?.(transaction)}
        onKeyDown={(e) => e.key === 'Enter' && onEdit?.(transaction)}
        aria-label={`Edit transaction ${title || ''}`}
        title="Click to edit"
      >
        <h4 className="font-semibold text-gray-100 truncate">
          {title}
        </h4>

        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm">
          <span className={`px-2 py-0.5 rounded-full ${chipColor}`}>
            {category || 'Uncategorized'}
          </span>
          <span className="text-gray-400">{formatDate(date)}</span>
        </div>

        {description ? (
          <p className="mt-1 text-xs text-gray-500 overflow-hidden whitespace-nowrap text-ellipsis">
            {description}
          </p>
        ) : null}
      </div>

      {/* Amount + actions */}
      <div className="flex items-center shrink-0 gap-2 sm:gap-3">
        <p className={`font-semibold ${amountColor} transition-transform duration-300 group-hover:-translate-y-0.5`}>
          {sign}{formatCurrency(amount)}
        </p>

        {/* Edit */}
        <button
          onClick={() => onEdit?.(transaction)}
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-1 px-2 rounded text-xs
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          aria-label="Edit transaction"
          title="Edit"
          type="button"
        >
          Edit
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete?.(_id)}
          className="bg-red-600 hover:bg-red-500 text-white font-medium py-1 px-2 rounded text-xs
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          aria-label="Delete transaction"
          title="Delete"
          type="button"
        >
          X
        </button>
      </div>
    </div>
  );
}

export default TransactionItem;