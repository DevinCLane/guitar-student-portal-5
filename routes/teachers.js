const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teachers");
const studentController = require("../controllers/students");
const { ensureAuth } = require("../middleware/auth");

// dashboard to view all students
router.get("/getDashboard", ensureAuth, teacherController.getDashboard);
// create a student
router.post("/createStudent", ensureAuth, teacherController.createStudent);
// view individual student
router.get("/student/:id", ensureAuth, studentController.getStudent);

module.exports = router;
