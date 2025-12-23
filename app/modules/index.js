'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// Инициализация Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      logging: config.logging || false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: false,
        underscored: true
      }
    }
  );
}

// Автоматический импорт всех моделей
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes || DataTypes);
    db[model.name] = model;
  });

// Устанавливаем связи (вызываем все associate методы)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Добавляем sequelize и Sequelize в объект db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Проверка подключения и синхронизация
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    
    // Опция для синхронизации
    // { force: true } - пересоздаст все таблицы (осторожно!)
    // { alter: true } - обновит структуру таблиц
    // {} - только проверка
    
    await sequelize.sync({ alter: true });
    console.log('✅ All models were synchronized successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
})();

module.exports = db;