// src/components/FloatingBackgroundSwitcher.jsx
import React, { useState } from 'react';
import BackgroundPicker from './BackgroundPicker';

export default function FloatingBackgroundSwitcher() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open && (
        <div className="mb-2 w-[320px] max-w-[90vw]">
          <BackgroundPicker />
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-11 w-11 rounded-full bg-gray-800 border border-gray-700 text-gray-200 shadow-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        title="Change background"
        type="button"
      >
        🎨
      </button>
    </div>
  );
}