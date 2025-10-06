const { Configuration, OpenAIApi } = require('openai');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Настройка OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Убедитесь, что ключ API установлен в переменных окружения
});
const openai = new OpenAIApi(configuration);

// Middleware для защиты HTTP-заголовков и ограничения запросов
function setupMiddleware(app) {
  app.use(helmet());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100, // Лимит 100 запросов с одного IP
  });
  app.use(limiter);
}

// Функция для отправки запроса к GPT
async function generateResponse(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Вы помощник для анализа данных пользователей.' },
        { role: 'user', content: prompt },
      ],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Ошибка при запросе к OpenAI API:', error.message || error);
    return 'Произошла ошибка при обработке запроса. Пожалуйста, попробуйте позже.';
  }
}

module.exports = { generateResponse, setupMiddleware };