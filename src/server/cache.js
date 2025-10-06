const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error('Ошибка подключения к Redis:', err.message || err);
  }
})();

/**
 * Устанавливает значение в кэш Redis.
 * @param {string} key - Ключ для сохранения данных.
 * @param {any} value - Значение для сохранения.
 * @param {number} [ttl=3600] - Время жизни ключа в секундах.
 */
async function setCache(key, value, ttl = 3600) {
  try {
    await client.set(key, JSON.stringify(value), { EX: ttl });
  } catch (err) {
    console.error('Ошибка при установке кэша:', err.message || err);
  }
}

/**
 * Получает значение из кэша Redis.
 * @param {string} key - Ключ для получения данных.
 * @returns {any|null} Значение из кэша или null, если ключ не найден.
 */
async function getCache(key) {
  try {
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.error('Ошибка при получении кэша:', err.message || err);
    return null;
  }
}

module.exports = { setCache, getCache };
