'use strict';

module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define("student", {
    student_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    full_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 255]
      }
    },
    date_of_birth: {
      type: Sequelize.DATE,
      allowNull: true
    },
    course_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',  // ✅ Указываем имя таблицы
        key: 'course_id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }
  }, {
    tableName: 'students',
    timestamps: false,
    indexes: [
      {
        fields: ['course_id']
      },
      {
        fields: ['full_name']
      }
    ]
  });

  Student.associate = function(models) {
    Student.belongsTo(models.course, {
      foreignKey: 'course_id',
      as: 'course'
    });
    Student.hasMany(models.enrollment, {
      foreignKey: 'student_id',
      as: 'enrollments'
    });
  };

  return Student;
};