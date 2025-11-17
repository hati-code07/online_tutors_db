module.exports = (sequelize, Sequelize) => {
  const Subject = sequelize.define("subject", {
    subject_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subject_name: {
      type: Sequelize.STRING(50)
    },
    program_type: {
      type: Sequelize.STRING(100)
    }
  });

  const Tutor = sequelize.define("tutor", {
    tutor_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    full_name: {
      type: Sequelize.STRING(255)
    },
    subject_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'subjects',
        key: 'subject_id'
      }
    },
    lesson_type: {
      type: Sequelize.STRING(50)
    },
    education: {
      type: Sequelize.TEXT(150)
    },
    experience: {
      type: Sequelize.INTEGER
    },
    price_per_hour: {
      type: Sequelize.DECIMAL(10, 2)
    },
    avg_rating: {
      type: Sequelize.DECIMAL(3, 2)
    }
  });

  const Course = sequelize.define("course", {
    course_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subject_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'subjects',
        key: 'subject_id'
      }
    },
    tutor_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'tutors',
        key: 'tutor_id'
      }
    }
  });

  const Student = sequelize.define("student", {
    student_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    full_name: {
      type: Sequelize.STRING(255)
    },
    date_of_birth: {
      type: Sequelize.DATE
    },
    course_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'courses',
        key: 'course_id'
      }
    }
  });

  const Enrollment = sequelize.define("enrollment", {
    enrollment_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    student_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'students',
        key: 'student_id'
      }
    },
    course_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'courses',
        key: 'course_id'
      }
    },
    tutor_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'tutors',
        key: 'tutor_id'
      }
    },
    enrollment_date: {
      type: Sequelize.STRING(45)
    }
  });

  // Определение ассоциаций (внешних ключей)
  Subject.hasMany(Tutor, { foreignKey: 'subject_id' });
  Tutor.belongsTo(Subject, { foreignKey: 'subject_id' });

  Subject.hasMany(Course, { foreignKey: 'subject_id' });
  Course.belongsTo(Subject, { foreignKey: 'subject_id' });

  Tutor.hasMany(Course, { foreignKey: 'tutor_id' });
  Course.belongsTo(Tutor, { foreignKey: 'tutor_id' });

  Course.hasMany(Student, { foreignKey: 'course_id' });
  Student.belongsTo(Course, { foreignKey: 'course_id' });

  Student.hasMany(Enrollment, { foreignKey: 'student_id' });
  Enrollment.belongsTo(Student, { foreignKey: 'student_id' });

  Course.hasMany(Enrollment, { foreignKey: 'course_id' });
  Enrollment.belongsTo(Course, { foreignKey: 'course_id' });

  Tutor.hasMany(Enrollment, { foreignKey: 'tutor_id' });
  Enrollment.belongsTo(Tutor, { foreignKey: 'tutor_id' });

  return {
    Subject,
    Tutor,
    Course,
    Student,
    Enrollment
  };
};