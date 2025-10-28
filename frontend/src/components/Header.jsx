// src/components/Header.jsx
import React from 'react';
import BackgroundPicker from './BackgroundPicker';

function Header() {
  return (
    <header className="mb-6 animate-fade-in-up">
      <div className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-900/80 p-5 md:p-6 shadow-inner">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white font-bold shadow-lg shadow-indigo-900/30 ring-1 ring-inset ring-white/10">
              V
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
              Vexa Expense Tracker
            </h1>
          </div>
          <div className="w-[320px] max-w-[45vw]">
            <BackgroundPicker />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;