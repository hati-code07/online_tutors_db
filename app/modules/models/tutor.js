'use strict';

module.exports = (sequelize, Sequelize) => {
  const Tutor = sequelize.define("tutor", {
    tutor_id: {
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
    lesson_type: {
      type: Sequelize.STRING(50),
      allowNull: true,
      defaultValue: 'Individual'
    },
    education: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    experience: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 60
      }
    },
    price_per_hour: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00,
      validate: {
        min: 0
      }
    },
    avg_rating: {
      type: Sequelize.DECIMAL(3, 2),
      allowNull: true,
      defaultValue: 0.00,
      validate: {
        min: 0,
        max: 5
      }
    }
  }, {
    tableName: 'tutors',
    timestamps: false,
    indexes: [
      {
        fields: ['subject_id']
      },
      {
        fields: ['full_name']
      }
    ]
  });

  Tutor.associate = function(models) {
    Tutor.belongsTo(models.subject, {
      foreignKey: 'subject_id',
      as: 'subject'
    });
    Tutor.hasMany(models.course, {
      foreignKey: 'tutor_id',
      as: 'courses'
    });
    Tutor.hasMany(models.enrollment, {
      foreignKey: 'tutor_id',
      as: 'enrollments'
    });
  };

  return Tutor;
};