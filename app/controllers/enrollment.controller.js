module.exports = {
  findAll: (req, res) => {
    console.log('GET /api/enrollments called');
    res.json([
      { enrollment_id: 1, student_id: 1, course_id: 1, tutor_id: 1, enrollment_date: '2024-01-15' },
      { enrollment_id: 2, student_id: 2, course_id: 2, tutor_id: 2, enrollment_date: '2024-01-16' }
    ]);
  },
  
  findOne: (req, res) => {
    console.log(`GET /api/enrollments/${req.params.id} called`);
    res.json({
      enrollment_id: parseInt(req.params.id),
      student_id: 1,
      course_id: 1,
      tutor_id: 1,
      enrollment_date: '2024-01-15'
    });
  },
  
  create: (req, res) => {
    console.log('POST /api/enrollments called', req.body);
    res.status(201).json({
      message: 'Enrollment created successfully',
      data: req.body
    });
  },
  
  update: (req, res) => {
    console.log(`PUT /api/enrollments/${req.params.id} called`, req.body);
    res.json({
      message: 'Enrollment updated successfully',
      id: req.params.id,
      data: req.body
    });
  },
  
  delete: (req, res) => {
    console.log(`DELETE /api/enrollments/${req.params.id} called`);
    res.json({
      message: `Enrollment ${req.params.id} deleted successfully`
    });
  }
};
