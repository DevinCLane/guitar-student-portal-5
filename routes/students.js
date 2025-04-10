const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students");
const { ensureAuth } = require("../middleware/auth");

// todo: dashboard view for a student
// todo: individual lesson view for a student
// todo: delete lesson plan for a student
// todo: add comment for a student
// view a single student
router.get("/:id", ensureAuth, studentController.getStudent);

module.exports = router;
