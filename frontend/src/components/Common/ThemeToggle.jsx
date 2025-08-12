import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="switch-container">
      <input
        type="checkbox"
        id="theme-toggle"
        className="switch-input"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <label
        htmlFor="theme-toggle"
        className={`switch-label ${darkMode ? 'dark' : 'light'}`}
      >
        <span className="switch-icon sun"><FaSun /></span>
        <span className="switch-icon moon"><FaMoon /></span>
        <span className="switch-slider"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
