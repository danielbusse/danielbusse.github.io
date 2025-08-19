'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) setTheme(saved);
  }, []);

  // Apply theme class to body
  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle function
  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <button
      onClick={toggle}
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000,
        background: 'var(--primary)',
        color: 'var(--text)',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer',
      }}
    >
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}
