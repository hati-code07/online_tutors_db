module.exports = {
  findAll: (req, res) => {
    console.log('GET /api/courses called');
    res.json([
      { course_id: 1, course_name: 'Mathematics 101', subject_id: 1, tutor_id: 1 },
      { course_id: 2, course_name: 'Science Basics', subject_id: 2, tutor_id: 2 }
    ]);
  },
  
  findOne: (req, res) => {
    console.log(`GET /api/courses/${req.params.id} called`);
    res.json({
      course_id: parseInt(req.params.id),
      course_name: `Course ${req.params.id}`,
      subject_id: 1,
      tutor_id: 1
    });
  },
  
  create: (req, res) => {
    console.log('POST /api/courses called', req.body);
    res.status(201).json({
      message: 'Course created successfully',
      data: req.body
    });
  },
  
  update: (req, res) => {
    console.log(`PUT /api/courses/${req.params.id} called`, req.body);
    res.json({
      message: 'Course updated successfully',
      id: req.params.id,
      data: req.body
    });
  },
  
  delete: (req, res) => {
    console.log(`DELETE /api/courses/${req.params.id} called`);
    res.json({
      message: `Course ${req.params.id} deleted successfully`
    });
  }
};
