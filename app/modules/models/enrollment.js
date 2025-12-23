'use strict';

module.exports = (sequelize, Sequelize) => {
  const Enrollment = sequelize.define("enrollment", {
    enrollment_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    student_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'students',  // ✅ Указываем имя таблицы
        key: 'student_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    course_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',  // ✅ Указываем имя таблицы
        key: 'course_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    tutor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'tutors',  // ✅ Указываем имя таблицы
        key: 'tutor_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    enrollment_date: {
      type: Sequelize.STRING(45),
      allowNull: false,
      defaultValue: new Date().toISOString().split('T')[0]
    }
  }, {
    tableName: 'enrollments',
    timestamps: false,
    indexes: [
      {
        fields: ['student_id']
      },
      {
        fields: ['course_id']
      },
      {
        fields: ['tutor_id']
      },
      {
        unique: true,
        fields: ['student_id', 'course_id']
      }
    ]
  });

  Enrollment.associate = function(models) {
    Enrollment.belongsTo(models.student, {
      foreignKey: 'student_id',
      as: 'student'
    });
    Enrollment.belongsTo(models.course, {
      foreignKey: 'course_id',
      as: 'course'
    });
    Enrollment.belongsTo(models.tutor, {
      foreignKey: 'tutor_id',
      as: 'tutor'
    });
  };

  return Enrollment;
};