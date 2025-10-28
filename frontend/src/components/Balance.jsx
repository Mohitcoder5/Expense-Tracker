// src/components/Balance.jsx
import React, { useEffect, useRef, useState, useMemo } from 'react';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);
  return reduced;
}

// Smooth count-up when values change
function useCountUp(value, duration = 700, disabled = false) {
  const [display, setDisplay] = useState(value ?? 0);
  const prev = useRef(value ?? 0);

  useEffect(() => {
    const end = Number(value ?? 0);

    if (disabled) {
      prev.current = end;
      setDisplay(end);
      return;
    }

    const start = Number(prev.current ?? 0);
    const diff = end - start;
    if (diff === 0) return;

    const startTime = performance.now();
    let raf;
    const step = (t) => {
      const p = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setDisplay(start + diff * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else prev.current = end;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, disabled]);

  return display;
}

function Balance({ totalIncome = 0, totalExpenses = 0, totalBalance = 0 }) {
  const prefersReduced = usePrefersReducedMotion();

  // Toggle these to enable/disable number animation
  const animateNumbers = !prefersReduced;

  const incomeVal = animateNumbers ? useCountUp(totalIncome, 700, false) : totalIncome;
  const expensesVal = animateNumbers ? useCountUp(totalExpenses, 700, false) : totalExpenses;
  const balanceVal = animateNumbers ? useCountUp(totalBalance, 800, false) : totalBalance;

  // Currency formatter (Indian numbering)
  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    []
  );
  const formatCurrency = (amount) => currencyFormatter.format(Number(amount ?? 0));

  return (
    <section
      className="group flex flex-col md:flex-row justify-around items-center gap-4
                 bg-gray-900 p-6 rounded-xl shadow-inner border border-gray-700/80
                 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30
                 motion-safe:animate-fade-in-up"
      aria-label="Balance summary"
    >
      {/* Total Income */}
      <div
        className="text-center m-2 motion-safe:animate-fade-in-up"
        style={{ animationDelay: '60ms' }}
      >
        <h3 className="text-lg font-semibold text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
          Total Income
        </h3>
        <div aria-live="polite" aria-atomic="true" className="tabular-nums">
          {/* Animated display (hidden from screen readers when animating) */}
          <p
            className="text-2xl font-bold text-green-400 transition-transform duration-300 group-hover:-translate-y-0.5"
            aria-hidden={animateNumbers}
            title={formatCurrency(totalIncome)}
          >
            {formatCurrency(incomeVal)}
          </p>
          {animateNumbers && (
            <span className="sr-only">{formatCurrency(totalIncome)}</span>
          )}
        </div>
      </div>

      {/* Total Expenses */}
      <div
        className="text-center m-2 motion-safe:animate-fade-in-up"
        style={{ animationDelay: '100ms' }}
      >
        <h3 className="text-lg font-semibold text-gray-300 transition-colors duration-300 group-hover:text-gray-200">
          Total Expenses
        </h3>
        <div aria-live="polite" aria-atomic="true" className="tabular-nums">
          <p
            className="text-2xl font-bold text-red-400 transition-transform duration-300 group-hover:-translate-y-0.5"
            aria-hidden={animateNumbers}
            title={formatCurrency(totalExpenses)}
          >
            {formatCurrency(expensesVal)}
          </p>
          {animateNumbers && (
            <span className="sr-only">{formatCurrency(totalExpenses)}</span>
          )}
        </div>
      </div>

      {/* Net Balance */}
      <div
        className="text-center m-2 mt-4 md:mt-2 motion-safe:animate-fade-in-up"
        style={{ animationDelay: '140ms' }}
      >
        <h3 className="text-lg font-semibold text-gray-100">Net Balance</h3>
        <div aria-live="polite" aria-atomic="true" className="tabular-nums">
          <p
            className={`text-3xl font-bold transition-transform duration-300 group-hover:-translate-y-0.5 ${
              totalBalance >= 0 ? 'text-blue-400' : 'text-red-400'
            }`}
            aria-hidden={animateNumbers}
            title={formatCurrency(totalBalance)}
          >
            {formatCurrency(balanceVal)}
          </p>
          {animateNumbers && (
            <span className="sr-only">{formatCurrency(totalBalance)}</span>
          )}
        </div>
      </div>
    </section>
  );
}

export default Balance;