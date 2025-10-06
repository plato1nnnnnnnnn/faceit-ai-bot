const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Используйте безопасный ключ в продакшене

/**
 * Хэширует пароль пользователя.
 * @param {string} password - Пароль для хэширования.
 * @returns {Promise<string>} Хэшированный пароль.
 */
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Проверяет пароль пользователя.
 * @param {string} password - Введённый пароль.
 * @param {string} hashedPassword - Хэшированный пароль.
 * @returns {Promise<boolean>} Результат проверки.
 */
async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Генерирует JWT токен для пользователя.
 * @param {Object} user - Объект пользователя.
 * @param {number} user.id - Идентификатор пользователя.
 * @param {string} user.email - Email пользователя.
 * @returns {string} Сгенерированный токен.
 */
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
}

/**
 * Проверяет JWT токен.
 * @param {string} token - Токен для проверки.
 * @returns {Object|null} Декодированные данные или null, если токен недействителен.
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    console.error('Ошибка проверки токена:', err.message || err);
    return null;
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
};