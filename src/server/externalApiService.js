const axios = require('axios');

/**
 * Выполняет запрос к внешнему API.
 * @param {string} endpoint - URL конечной точки API.
 * @returns {Object|null} Данные ответа или null в случае ошибки.
 */
async function makeApiRequest(endpoint) {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${process.env.GAME_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Ошибка при запросе к API (${endpoint}):`, error.response?.status, error.message || error);
    return null;
  }
}

/**
 * Получает данные игрока по его идентификатору.
 * @param {string} playerId - Идентификатор игрока.
 * @returns {Object|null} Данные игрока или null в случае ошибки.
 */
async function fetchPlayerData(playerId) {
  return await makeApiRequest(`https://api.example.com/players/${playerId}`);
}

/**
 * Получает статистику игры по её идентификатору.
 * @param {string} gameId - Идентификатор игры.
 * @returns {Object|null} Данные статистики или null в случае ошибки.
 */
async function fetchGameStats(gameId) {
  return await makeApiRequest(`https://api.example.com/games/${gameId}`);
}

module.exports = { fetchPlayerData, fetchGameStats };