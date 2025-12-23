const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");

router.post("/", courseController.create);
router.get("/", courseController.findAll);
router.get("/:id", courseController.findOne);
router.put("/:id", courseController.update);
router.delete("/:id", courseController.delete);

module.exports = router;