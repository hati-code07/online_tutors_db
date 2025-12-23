module.exports = {
  findAll: (req, res) => {
    console.log('GET /api/students called');
    res.json([
      { student_id: 1, student_name: 'Alice Johnson', course_id: 1, email: 'alice@example.com' },
      { student_id: 2, student_name: 'Bob Williams', course_id: 2, email: 'bob@example.com' }
    ]);
  },
  
  findOne: (req, res) => {
    console.log(`GET /api/students/${req.params.id} called`);
    res.json({
      student_id: parseInt(req.params.id),
      student_name: `Student ${req.params.id}`,
      course_id: 1,
      email: `student${req.params.id}@example.com`
    });
  },
  
  create: (req, res) => {
    console.log('POST /api/students called', req.body);
    res.status(201).json({
      message: 'Student created successfully',
      data: req.body
    });
  },
  
  update: (req, res) => {
    console.log(`PUT /api/students/${req.params.id} called`, req.body);
    res.json({
      message: 'Student updated successfully',
      id: req.params.id,
      data: req.body
    });
  },
  
  delete: (req, res) => {
    console.log(`DELETE /api/students/${req.params.id} called`);
    res.json({
      message: `Student ${req.params.id} deleted successfully`
    });
  }
};
