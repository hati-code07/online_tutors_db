
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD
, {
host: dbConfig.HOST,
dialect: dbConfig.dialect,
port: dbConfig.port,
operatorsAliases: false,
pool: {
max: dbConfig.pool.max,
min: dbConfig.pool.min,
acquire: dbConfig.pool.acquire,
idle: dbConfig.pool.idle
}
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
const models = require("./goods-group.model.js")(sequelize, Sequelize);
db.subjects = models.Subject;
db.tutors = models.Tutor;
db.courses = models.Course;
db.students = models.Student;
db.enrollments = models.Enrollment;
require("./references.model.js")(db);
module.exports = db;
