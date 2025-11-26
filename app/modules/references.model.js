module.exports = (db) => {
  const { Subject, Tutor, Course, Student, Enrollment } = db;
  
  // Subject ↔ Tutor (One-to-Many)
  Subject.hasMany(Tutor, { 
    foreignKey: 'subject_id',
    as: 'tutors'
  });
  Tutor.belongsTo(Subject, { 
    foreignKey: 'subject_id',
    as: 'subject'
  });

  // Subject ↔ Course (One-to-Many)
  Subject.hasMany(Course, { 
    foreignKey: 'subject_id',
    as: 'courses'
  });
  Course.belongsTo(Subject, { 
    foreignKey: 'subject_id',
    as: 'subject'
  });

  // Tutor ↔ Course (One-to-Many)
  Tutor.hasMany(Course, { 
    foreignKey: 'tutor_id',
    as: 'courses'
  });
  Course.belongsTo(Tutor, { 
    foreignKey: 'tutor_id',
    as: 'tutor'
  });

  // Course ↔ Student (One-to-Many)
  Course.hasMany(Student, { 
    foreignKey: 'course_id',
    as: 'students'
  });
  Student.belongsTo(Course, { 
    foreignKey: 'course_id',
    as: 'course'
  });

  // Student ↔ Enrollment (One-to-Many)
  Student.hasMany(Enrollment, { 
    foreignKey: 'student_id',
    as: 'enrollments'
  });
  Enrollment.belongsTo(Student, { 
    foreignKey: 'student_id',
    as: 'student'
  });

  // Course ↔ Enrollment (One-to-Many)
  Course.hasMany(Enrollment, { 
    foreignKey: 'course_id',
    as: 'enrollments'
  });
  Enrollment.belongsTo(Course, { 
    foreignKey: 'course_id',
    as: 'course'
  });

  // Tutor ↔ Enrollment (One-to-Many)
  Tutor.hasMany(Enrollment, { 
    foreignKey: 'tutor_id',
    as: 'enrollments'
  });
  Enrollment.belongsTo(Tutor, { 
    foreignKey: 'tutor_id',
    as: 'tutor'
  });

  return db;
};