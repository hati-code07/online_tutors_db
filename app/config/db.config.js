
// module.exports = {
// HOST: process.env.DB_HOST,
// USER: process.env.DB_USER,
// PASSWORD: process.env.DB_PASSWORD,
// DB: process.env.DB_NAME,
// port: process.env.DB_PORT,
// dialect: "postgres",
// pool: {
// max: 5,
// min: 0,
// acquire: 30000,
// idle: 10000
// }
// };


module.exports = {
  HOST: "postgresdb",
  USER: "trade-app",
  PASSWORD: "123456",
  DB: "trade-app-db",
  dialect: "postgres",
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

