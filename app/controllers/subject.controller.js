
'use strict';

// Простая версия без БД для начала
const getAll = async (req, res) => {
  console.log('GET /api/subjects called');
  res.json([
    { subject_id: 1, subject_name: 'Mathematics', program_type: 'General' },
    { subject_id: 2, subject_name: 'Science', program_type: 'General' },
    { subject_id: 3, subject_name: 'History', program_type: 'Advanced' }
  ]);
};

const getById = async (req, res) => {
  console.log(`GET /api/subjects/${req.params.id} called`);
  res.json({
    subject_id: parseInt(req.params.id),
    subject_name: `Subject ${req.params.id}`,
    program_type: 'General'
  });
};

const create = async (req, res) => {
  console.log('POST /api/subjects called', req.body);
  res.status(201).json({
    subject_id: 999,
    ...req.body,
    message: 'Subject created successfully'
  });
};

const update = async (req, res) => {
  console.log(`PUT /api/subjects/${req.params.id} called`, req.body);
  res.json({
    subject_id: parseInt(req.params.id),
    ...req.body,
    message: 'Subject updated successfully'
  });
};

const deleteSubject = async (req, res) => {
  console.log(`DELETE /api/subjects/${req.params.id} called`);
  res.json({
    message: `Subject ${req.params.id} deleted successfully`
  });
};

// Экспортируем как объект
module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteSubject
};
