const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teachers");
const studentController = require("../controllers/students");
const { ensureAuth } = require("../middleware/auth");
const upload = require("../middleware/multer");

/* 
Teacher dashboard
*/

// dashboard to view all students
router.get("/dashboard", ensureAuth, teacherController.getDashboard);

/* 
Student Management
*/

// view individual student
// todo: create view for student
router.get("/student/:studentId", ensureAuth, studentController.getStudent);
// Display add student form
router.get("/student/new", ensureAuth, teacherController.getNewStudentForm);
// create new student
router.post("/student", ensureAuth, teacherController.createStudent);
// display edit student form
// todo: create controller method for edit student form
router.get(
    "/student/:studentId/edit",
    ensureAuth,
    studentController.getEditStudentForm
);
// update student
// todo: create controller method for update student
router.put("/student/:studentId", ensureAuth, studentController.updateStudent);
// delete student
// todo: create controller method for deleting student
router.delete(
    "/student/:studentId",
    ensureAuth,
    studentController.deleteStudent
);
// delete a student
// todo: create delete student functionality
router.post("/deleteStudent/:id", ensureAuth, teacherController.deleteStudent);

/* 
Lesson Management
*/

// display new lesson form
router.get(
    "/student/:studentId/lesson/new",
    ensureAuth,
    teacherController.getNewLessonForm
);
// create a new lesson plan
router.post(
    "/student/:studentId/lesson",
    ensureAuth,
    upload.single("file"),
    // todo: create a new lesson plan as a teacher
    teacherController.createLesson
);
router.get(
    "/student/:studentId/lessonPlan/:lessonId/edit",
    ensureAuth,
    teacherController.getEditLessonForm
);
router.put(
    "/student/:studentId/lessonPlan/:lessonId",
    ensureAuth,
    teacherController.getEditLessonForm
);
// delete a lesson plan
router.delete(
    "/student/:studentId/lessonPlan/:lessonPlanId",
    ensureAuth,
    // todo: controller to delete a lesson plan as a teacher
    teacherController.deleteLessonPlan
);

module.exports = router;
