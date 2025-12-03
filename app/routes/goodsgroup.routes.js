const express = require("express");
const router = express.Router();
const goodsgroup = require("../controllers/goodsgroup.controller.js");

// Subjects routes
router.post("/subjects", goodsgroup.createSubject);
router.get("/subjects", goodsgroup.findAllSubjects);
router.get("/subjects/:id", goodsgroup.findOneSubject);
router.put("/subjects/:id", goodsgroup.updateSubject);
router.delete("/subjects/:id", goodsgroup.deleteSubject);
router.delete("/subjects", goodsgroup.deleteAllSubjects);

// Tutors routes
router.post("/tutors", goodsgroup.createTutor);
router.get("/tutors", goodsgroup.findAllTutors);
router.get("/tutors/:id", goodsgroup.findOneTutor);
router.put("/tutors/:id", goodsgroup.updateTutor);
router.delete("/tutors/:id", goodsgroup.deleteTutor);
router.delete("/tutors", goodsgroup.deleteAllTutors);

// Additional routes
router.get("/subjects/:subjectId/tutors", goodsgroup.findTutorsBySubject);

module.exports = router;