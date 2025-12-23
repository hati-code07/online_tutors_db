'use strict';

module.exports = (sequelize, Sequelize) => {
  const Subject = sequelize.define("subject", {
    subject_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    subject_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    program_type: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: 'General'
    }
  }, {
    tableName: 'subjects',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['subject_name']
      }
    ]
  });

  Subject.associate = function(models) {
    Subject.hasMany(models.tutor, {
      foreignKey: 'subject_id',
      as: 'tutors'
    });
    Subject.hasMany(models.course, {
      foreignKey: 'subject_id',
      as: 'courses'
    });
  };

  return Subject;
};