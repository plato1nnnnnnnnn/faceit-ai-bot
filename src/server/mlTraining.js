const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

/**
 * Загружает данные для обучения из файла.
 * @returns {Object} Объект с входными и выходными данными.
 */
function loadTrainingData() {
  const rawData = fs.readFileSync('user_data.json', 'utf-8').split('\n').filter(Boolean);
  const parsedData = rawData.map((line) => JSON.parse(line));

  const inputs = parsedData.map((entry) => [entry.userId, entry.action.length]);
  const outputs = parsedData.map((entry) => [entry.result]);

  return { inputs, outputs };
}

const { inputs, outputs } = loadTrainingData();
const trainingData = tf.tensor2d(inputs);
const outputData = tf.tensor2d(outputs);

/**
 * Создает и обучает модель TensorFlow.
 */
async function trainModel() {
  const model = tf.sequential();

  model.add(tf.layers.dense({
    inputShape: [2],
    units: 4,
    activation: 'relu',
  }));

  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid',
  }));

  model.compile({
    optimizer: 'adam',
    loss: 'meanSquaredError',
  });

  console.log('Начало обучения модели...');

  try {
    await model.fit(trainingData, outputData, {
      epochs: 100,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Эпоха ${epoch + 1}: Потери = ${logs.loss}`);
        },
      },
    });

    console.log('Обучение завершено.');

    // Сохранение модели
    await model.save('file://./model');
  } catch (error) {
    console.error('Ошибка при обучении модели:', error.message || error);
  }
}

trainModel().catch(console.error);