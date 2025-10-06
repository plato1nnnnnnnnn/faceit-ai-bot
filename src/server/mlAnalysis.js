const tf = require('@tensorflow/tfjs-node');

/**
 * Загружает обученную модель TensorFlow.
 * @returns {Promise<Object>} Объект модели.
 */
async function loadTrainedModel() {
  try {
    const model = await tf.loadLayersModel('file://./model/model.json');
    return model;
  } catch (error) {
    console.error('Ошибка при загрузке модели:', error.message || error);
    throw new Error('Не удалось загрузить модель.');
  }
}

/**
 * Анализирует данные с использованием обученной модели.
 * @param {Array<number>} inputData - Входные данные для анализа.
 * @returns {Array<number>} Результаты предсказания.
 */
async function analyzeDemoData(inputData) {
  try {
    const model = await loadTrainedModel();

    // Преобразование входных данных в тензор
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

module.exports = { analyzeDemoData };