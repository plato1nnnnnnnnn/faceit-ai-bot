const tf = require('@tensorflow/tfjs-node');

/**
 * Загружает предобученную модель TensorFlow.
 * @returns {Promise<Object>} Объект модели.
 */
async function loadModel() {
  try {
    const model = await tf.loadLayersModel('file://path/to/your/model.json');
    return model;
  } catch (error) {
    console.error('Ошибка при загрузке модели:', error.message || error);
    throw new Error('Не удалось загрузить модель.');
  }
}

/**
 * Анализирует данные с использованием модели.
 * @param {Array<number>} inputData - Входные данные для анализа.
 * @returns {Array<number>} Результаты предсказания.
 */
async function analyzeData(inputData) {
  try {
    const model = await loadModel();

    // Преобразование данных для модели
    const tensor = tf.tensor2d(inputData, [1, inputData.length]);

    // Получение предсказания
    const prediction = model.predict(tensor);
    const result = prediction.dataSync();

    return Array.from(result);
  } catch (error) {
    console.error('Ошибка при анализе данных:', error.message || error);
    return [];
  }
}

module.exports = { analyzeData };