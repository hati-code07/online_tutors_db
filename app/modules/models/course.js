'use strict';

module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    course_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    subject_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'subjects',  // ✅ Указываем имя таблицы
        key: 'subject_id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    tutor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tutors',  // ✅ Указываем имя таблицы
        key: 'tutor_id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }
  }, {
    tableName: 'courses',
    timestamps: false,
    indexes: [
      {
        fields: ['subject_id']
      },
      {
        fields: ['tutor_id']
      },
      {
        unique: true,
        fields: ['subject_id', 'tutor_id']
      }
    ]
  });

  Course.associate = function(models) {
    Course.belongsTo(models.subject, {
      foreignKey: 'subject_id',
      as: 'subject'
    });
    Course.belongsTo(models.tutor, {
      foreignKey: 'tutor_id',
      as: 'tutor'
    });
    Course.hasMany(models.student, {
      foreignKey: 'course_id',
      as: 'students'
    });
    Course.hasMany(models.enrollment, {
      foreignKey: 'course_id',
      as: 'enrollments'
    });
  };

  return Course;
};