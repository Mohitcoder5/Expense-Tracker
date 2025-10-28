import React from 'react';
import { useBackground } from '../context/BackgroundProvider';

const previewClasses = {
  solid: 'bg-gray-950',
  gradient: 'bg-gradient-to-b from-gray-950 via-indigo-950 to-gray-900',
  grid: 'bg-gradient-to-b from-gray-950 to-gray-900 bg-grid',
  animated: 'bg-animated',
  // photo handled inline
};

function VariantButton({ id, label, active, onClick, photoUrl }) {
  const base =
    'relative w-20 h-14 rounded-lg border transition-all overflow-hidden ' +
    (active ? 'border-indigo-400 ring-2 ring-indigo-400' : 'border-gray-700 hover:border-gray-500');

  const isPhoto = id === 'photo';
  const previewClass = isPhoto ? '' : previewClasses[id] || 'bg-gray-950';

  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1"
      onClick={onClick}
      aria-pressed={active}
      title={label}
    >
      <div className={base}>
        <div className={`absolute inset-0 ${previewClass}`} />
        {id === 'gradient' && (
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(99,102,241,0.25),transparent)]" />
        )}
        {id === 'grid' && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(99,102,241,0.20),transparent)]" />
            <div className="absolute inset-0 bg-grid opacity-30" />
          </>
        )}
        {isPhoto && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${photoUrl || '/images/mesh.jpg'}')` }}
            />
            <div className="absolute inset-0 bg-black/35" />
          </>
        )}
      </div>
      <span className={`text-xs ${active ? 'text-indigo-300' : 'text-gray-400'}`}>{label}</span>
    </button>
  );
}

export default function BackgroundPicker() {
  const { variant, setVariant, photoUrl, setPhotoUrl, options } = useBackground();

  return (
    <div className="bg-gray-900/80 border border-gray-700 rounded-xl p-3 md:p-4 shadow-inner animate-fade-in-up">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-200">Background</h4>
        <button
          type="button"
          onClick={() => setVariant('gradient')}
          className="text-xs text-gray-400 hover:text-indigo-300"
          title="Reset to default"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {options.map((opt) => (
          <VariantButton
            key={opt.id}
            id={opt.id}
            label={opt.label}
            active={variant === opt.id}
            onClick={() => setVariant(opt.id)}
            photoUrl={photoUrl}
          />
        ))}
      </div>

      {variant === 'photo' && (
        <div className="mt-3">
          <label className="block text-xs text-gray-400 mb-1">Photo URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="/images/mesh.jpg or https://..."
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="flex-1 p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <p className="mt-1 text-[11px] text-gray-500">
            Tip: place an image in public/images and reference it like /images/your-bg.jpg
          </p>
        </div>
      )}
    </div>
  );
}