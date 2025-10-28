/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': { '0%': { opacity: 0, transform: 'translateY(8px) scale(0.98)' }, '100%': { opacity: 1, transform: 'translateY(0) scale(1)' } },
        pop: { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.04)' }, '100%': { transform: 'scale(1)' } },
        'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'fade-out': { '0%': { opacity: 1 }, '100%': { opacity: 0 } },
        'scale-in': { '0%': { opacity: 0, transform: 'translateY(8px) scale(0.98)' }, '100%': { opacity: 1, transform: 'translateY(0) scale(1)' } },
        'scale-out': { '0%': { opacity: 1, transform: 'translateY(0) scale(1)' }, '100%': { opacity: 0, transform: 'translateY(8px) scale(0.98)' } },
      },
      animation: {
        'fade-in-up': 'fade-in-up 500ms cubic-bezier(0.16, 1, 0.3, 1) both',
        pop: 'pop 300ms ease-out',
        'fade-in': 'fade-in 250ms ease-out both',
        'fade-out': 'fade-out 200ms ease-in both',
        'scale-in': 'scale-in 280ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-out': 'scale-out 200ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};