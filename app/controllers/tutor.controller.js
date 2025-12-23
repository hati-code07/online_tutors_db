'END'
module.exports = {
  getAll: (req, res) => {
    console.log('GET /api/tutors called');
    res.json([
      { tutor_id: 1, tutor_name: 'John Doe', subject_id: 1 },
      { tutor_id: 2, tutor_name: 'Jane Smith', subject_id: 2 }
    ]);
  },
  
  getById: (req, res) => {
    console.log(`GET /api/tutors/${req.params.id} called`);
    res.json({
      tutor_id: parseInt(req.params.id),
      tutor_name: `Tutor ${req.params.id}`,
      subject_id: 1
    });
  },
  
  create: (req, res) => {
    console.log('POST /api/tutors called', req.body);
    res.status(201).json({
      message: 'Tutor created successfully',
      data: req.body
    });
  },
  
  update: (req, res) => {
    console.log(`PUT /api/tutors/${req.params.id} called`, req.body);
    res.json({
      message: 'Tutor updated successfully',
      id: req.params.id,
      data: req.body
    });
  },
  
  delete: (req, res) => {
    console.log(`DELETE /api/tutors/${req.params.id} called`);
    res.json({
      message: `Tutor ${req.params.id} deleted successfully`
    });
  }
};
