import React from 'react';
import { toggleDarkMode } from '../utils/darkModeToggle';

// Стили для навигации
const styles = {
  nav: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    color: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

/**
 * Компонент навигации с переключателем тёмного режима.
 * @returns JSX.Element
 */
const Navigation: React.FC = () => {
  return (
    <nav style={styles.nav}>
      <h1>Faceit AI Bot</h1>
      <button onClick={toggleDarkMode} style={styles.button}>
        Toggle Dark Mode
      </button>
    </nav>
  );
};

export default Navigation;