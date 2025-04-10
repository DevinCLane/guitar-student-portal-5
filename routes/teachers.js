const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teachers");
const studentController = require("../controllers/students");
const { ensureAuth } = require("../middleware/auth");
const upload = require("../middleware/multer");

/* 
Dashboard
*/
// dashboard to view all students
router.get("/dashboard", ensureAuth, teacherController.getDashboard);

/* 
Students
*/
// Display the "add a new student" form
router.get("/newStudent", ensureAuth, teacherController.getNewStudentForm);
// create a student
router.post("/createStudent", ensureAuth, teacherController.createStudent);
// view individual student
// todo: create view for student
router.get("/student/:id", ensureAuth, studentController.getStudent);
// delete a student
// todo: create delete student functionality
router.post("/deleteStudent/:id", ensureAuth, teacherController.deleteStudent);

/* 
Lesson Plans
*/
// get the student's lesson plans
router.get(
    "/student/:studentId/lessonPlans",
    ensureAuth,
    // todo: create the controller for getting a student's lesson plans teacher view
    teacherController.getStudentLessonPlans
);

// create a new lesson plan
router.post(
    "/student/:studentId/createLessonPlan",
    upload.single("file"),
    // todo: create a new lesson plan as a teacher
    teacherController.createLessonPlan
);

// delete a lesson plan
router.delete(
    "/student/:studentId/lessonPlan/:lessonPlanId",
    ensureAuth,
    // todo: controller to delete a lesson plan as a teacher
    teacherController.deleteLessonPlan
);

module.exports = router;
