const db = require("../modules/index.js");
const Subject = db.subjects;
const Tutor = db.tutors;
const Course = db.courses;
const Student = db.students;
const Enrollment = db.enrollments;
const Op = db.Sequelize.Op;

// Create and Save a new Subject
exports.createSubject = (req, res) => {
  // Validate request
  if (!req.body.subject_name) {
    res.status(400).send({
      message: "Subject name can not be empty!"
    });
    return;
  }

  // Create a Subject
  const subject = {
    subject_name: req.body.subject_name,
    program_type: req.body.program_type
  };

  // Save Subject in the database
  Subject.create(subject)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Subject."
      });
    });
};

// Create and Save a new Tutor
exports.createTutor = (req, res) => {
  // Validate request
  if (!req.body.full_name || !req.body.subject_id) {
    res.status(400).send({
      message: "Full name and subject ID can not be empty!"
    });
    return;
  }

  // Create a Tutor
  const tutor = {
    full_name: req.body.full_name,
    subject_id: req.body.subject_id,
    lesson_type: req.body.lesson_type,
    education: req.body.education,
    experience: req.body.experience,
    price_per_hour: req.body.price_per_hour,
    avg_rating: req.body.avg_rating
  };

  // Save Tutor in the database
  Tutor.create(tutor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tutor."
      });
    });
};

// Retrieve all Subjects from the database
exports.findAllSubjects = (req, res) => {
  const subject_name = req.query.subject_name;
  var condition = subject_name ? { subject_name: { [Op.iLike]: `%${subject_name}%` } } : null;

  Subject.findAll({ 
    where: condition,
    include: ["tutors", "courses"]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving subjects."
      });
    });
};

// Retrieve all Tutors from the database
exports.findAllTutors = (req, res) => {
  const full_name = req.query.full_name;
  var condition = full_name ? { full_name: { [Op.iLike]: `%${full_name}%` } } : null;

  Tutor.findAll({ 
    where: condition,
    include: [
      {
        model: db.subjects,
        as: "subject"
      },
      {
        model: db.courses,
        as: "courses"
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutors."
      });
    });
};

// Find a single Subject with an id
exports.findOneSubject = (req, res) => {
  const id = req.params.id;

  Subject.findByPk(id, {
    include: [
      {
        model: db.tutors,
        as: "tutors"
      },
      {
        model: db.courses,
        as: "courses",
        include: [
          {
            model: db.tutors,
            as: "tutor"
          }
        ]
      }
    ]
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Subject with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Subject with id=" + id
      });
    });
};

// Find a single Tutor with an id
exports.findOneTutor = (req, res) => {
  const id = req.params.id;

  Tutor.findByPk(id, {
    include: [
      {
        model: db.subjects,
        as: "subject"
      },
      {
        model: db.courses,
        as: "courses",
        include: [
          {
            model: db.subjects,
            as: "subject"
          }
        ]
      }
    ]
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutor with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutor with id=" + id
      });
    });
};

// Update a Subject by the id in the request
exports.updateSubject = (req, res) => {
  const id = req.params.id;

  Subject.update(req.body, {
    where: { subject_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Subject was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Subject with id=${id}. Maybe Subject was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Subject with id=" + id
      });
    });
};

// Update a Tutor by the id in the request
exports.updateTutor = (req, res) => {
  const id = req.params.id;

  Tutor.update(req.body, {
    where: { tutor_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutor was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutor with id=${id}. Maybe Tutor was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutor with id=" + id
      });
    });
};

// Delete a Subject with the specified id in the request
exports.deleteSubject = (req, res) => {
  const id = req.params.id;

  Subject.destroy({
    where: { subject_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Subject was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Subject with id=${id}. Maybe Subject was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Subject with id=" + id
      });
    });
};

// Delete a Tutor with the specified id in the request
exports.deleteTutor = (req, res) => {
  const id = req.params.id;

  Tutor.destroy({
    where: { tutor_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutor was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutor with id=${id}. Maybe Tutor was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutor with id=" + id
      });
    });
};

// Delete all Subjects from the database
exports.deleteAllSubjects = (req, res) => {
  Subject.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Subjects were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all subjects."
      });
    });
};

// Delete all Tutors from the database
exports.deleteAllTutors = (req, res) => {
  Tutor.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutors were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all tutors."
      });
    });
};

// Find all Tutors by Subject
exports.findTutorsBySubject = (req, res) => {
  const subject_id = req.params.subjectId;

  Tutor.findAll({
    where: { subject_id: subject_id },
    include: [
      {
        model: db.subjects,
        as: "subject"
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutors by subject."
      });
    });
};