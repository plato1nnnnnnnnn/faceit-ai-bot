/**
 * Переключает тёмный режим на странице.
 * Сохраняет состояние в localStorage.
 */
export function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');

  try {
    // Сохранение состояния в localStorage
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  } catch (error) {
    console.error('Ошибка при сохранении темы в localStorage:', error);
  }
}

/**
 * Инициализирует тёмный режим при загрузке страницы.
 * Устанавливает тему на основе сохранённого состояния в localStorage.
 */
export function initializeDarkMode() {
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  } catch (error) {
    console.error('Ошибка при инициализации темы из localStorage:', error);
  }
}