const fs = require('fs');

/**
 * Сбор данных о действиях пользователей.
 * @param {number} userId - Идентификатор пользователя.
 * @param {string} action - Действие, выполненное пользователем.
 * @param {string} result - Результат действия.
 */
function collectUserData(userId, action, result) {
  const data = {
    userId,
    action,
    result,
    timestamp: new Date().toISOString(),
  };

  try {
    fs.appendFileSync('user_data.json', JSON.stringify(data) + '\n');
    console.log('Данные успешно сохранены:', data);
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error.message || error);
  }
}

module.exports = { collectUserData };