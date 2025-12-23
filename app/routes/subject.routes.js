const express = require("express");
const router = express.Router();
const subjectController = require("/Users/machati/trade-project/trade-app/app/controllers/subject.controller.js");

router.get('/', subjectController.getAll);
router.get('/:id', subjectController.getById);
router.post('/', subjectController.create);
router.put('/:id', subjectController.update);
router.delete('/:id', subjectController.delete);

module.exports = router;