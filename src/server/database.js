const { Sequelize } = require('sequelize');

// Инициализация Sequelize с использованием SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Определение модели пользователя
const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Определение модели подписки
const Subscription = sequelize.define('Subscription', {
  level: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

// Установление связей между моделями
User.hasOne(Subscription);
Subscription.belongsTo(User);

// Синхронизация базы данных
(async () => {
  try {
    await sequelize.sync(); // Убрано force: true для предотвращения потери данных
    console.log('База данных и таблицы успешно созданы!');
  } catch (error) {
    console.error('Ошибка при синхронизации базы данных:', error.message || error);
  }
})();

module.exports = { sequelize, User, Subscription };