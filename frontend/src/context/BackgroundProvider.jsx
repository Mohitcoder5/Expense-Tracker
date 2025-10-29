import React, { createContext, useContext, useEffect, useState } from 'react';

const BG_OPTIONS = [
  { id: 'solid', label: 'Solid' },
  { id: 'gradient', label: 'Gradient' },
  { id: 'grid', label: 'Grid' },
  { id: 'photo', label: 'Photo' },
  { id: 'animated', label: 'Animated' },
];

const BackgroundContext = createContext({
  variant: 'gradient',
  setVariant: () => {},
  photoUrl: '/images/mesh.jpg',
  setPhotoUrl: () => {},
  options: BG_OPTIONS,
});

export function useBackground() {
  return useContext(BackgroundContext);
}

function Background({ variant, photoUrl }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      {variant === 'solid' && (
        <div className="absolute inset-0 bg-gray-950" />
      )}

      {variant === 'gradient' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(99,102,241,0.15),transparent)]" />
        </>
      )}

      {variant === 'grid' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(99,102,241,0.12),transparent)]" />
          <div className="absolute inset-0 bg-grid opacity-25" />
        </>
      )}

      {variant === 'photo' && (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${photoUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}

      {variant === 'animated' && (
        <>
          <div className="absolute inset-0 bg-animated" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(99,102,241,0.10),transparent)]" />
        </>
      )}
    </div>
  );
}

export default function BackgroundProvider({ children, defaultVariant = 'gradient' }) {
  const [variant, setVariant] = useState(() => {
    try {
      return localStorage.getItem('bg-variant') || defaultVariant;
    } catch {
      return defaultVariant;
    }
  });
  const [photoUrl, setPhotoUrl] = useState(() => {
    try {
      return localStorage.getItem('bg-photo') || '/images/mesh.jpg';
    } catch {
      return '/images/mesh.jpg';
    }
  });

  useEffect(()_ => {
    try {
      localStorage.setItem('bg-variant', variant);
    } catch {}
  }, [variant]);

  useEffect(() => {
    try {
      localStorage.setItem('bg-photo', photoUrl);
    } catch {}
  }, [photoUrl]);

  return (
    <BackgroundContext.Provider value={{ variant, setVariant, photoUrl, setPhotoUrl, options: BG_OPTIONS }}>
      <Background variant={variant} photoUrl={photoUrl} />
      {children}
    </BackgroundContext.Provider>
  );
}