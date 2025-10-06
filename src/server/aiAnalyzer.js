// Пример интеграции ИИ для анализа данных пользователя
const { User, Subscription } = require('./database');
const { generateResponse } = require('./gptService');

/**
 * Анализ данных пользователя с использованием GPT.
 * @param {number} userId - Идентификатор пользователя.
 * @returns {Object} Результаты анализа или сообщение об ошибке.
 */
async function analyzeUser(userId) {
  try {
    const user = await User.findByPk(userId, { include: Subscription });
    if (!user) {
      return { error: 'Пользователь не найден' };
    }

    const subscriptionLevel = user.Subscription?.level || 'Нет';
    const prompt = `Пользователь: ${user.username}, Подписка: ${subscriptionLevel}, ID: ${user.id}`;

    const gptResponse = await generateResponse(prompt);

    return {
      user: user.username,
      recommendations: [gptResponse],
      stats: {
        gamesAnalyzed: Math.floor(Math.random() * 100),
        winRate: `${(Math.random() * 100).toFixed(2)}%`,
      },
    };
  } catch (error) {
    console.error('Ошибка при анализе пользователя:', error.message || error);
    return { error: 'Произошла ошибка при анализе данных пользователя.' };
  }
}

module.exports = { analyzeUser };