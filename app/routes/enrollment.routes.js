const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollment.controller");

router.post("/", enrollmentController.create);
router.get("/", enrollmentController.findAll);
router.get("/:id", enrollmentController.findOne);
router.put("/:id", enrollmentController.update);
router.delete("/:id", enrollmentController.delete);

module.exports = router;