const express = require("express");
const router = express.Router();
const teacherDashboardController = require("../controllers/teacher/dashboard");
const teacherStudentController = require("../controllers/teacher/studentsController");
const teacherLessonController = require("../controllers/teacher/lessonController");
const { ensureAuth } = require("../middleware/auth");
const upload = require("../middleware/multer");

/* 
Teacher dashboard
*/

// dashboard to view all students
router.get("/dashboard", ensureAuth, teacherDashboardController.getDashboard);

/* 
Student Management
*/

// Display add student form
router.get(
    "/students/new",
    ensureAuth,
    teacherStudentController.getNewStudentForm
);
// create new student
router.post("/students", ensureAuth, teacherStudentController.createStudent);

// view individual student
// todo: create view for student
router.get(
    "/students/:studentId",
    ensureAuth,
    teacherStudentController.getStudent
);
// display edit student form
// todo: create controller method for edit student form
// router.get(
//     "/students/:studentId/edit",
//     ensureAuth,
//     studentController.getEditStudentForm
// );
// update student
// todo: create controller method for update student
// router.put("/students/:studentId", ensureAuth, studentController.updateStudent);
// delete student
// todo: create controller method for deleting student
router.delete(
    "/students/:studentId",
    ensureAuth,
    teacherStudentController.deleteStudent
);

// /*
// Lesson Management
// */

// display new lesson form
router.get(
    "/students/:studentId/lesson/new",
    ensureAuth,
    teacherLessonController.getNewLessonForm
);
// // create a new lesson plan
router.post(
    "/students/:studentId/lesson",
    ensureAuth,
    upload.single("file"),
    // todo: create a new lesson plan as a teacher
    teacherLessonController.createLesson
);

// router.get(
//     "/students/:studentId/lesson/:lessonId",
//     ensureAuth,
//     teacherController.getLesson
// );
// router.get(
//     "/students/:studentId/lesson/:lessonId/edit",
//     ensureAuth,
//     teacherController.getEditLessonForm
// );

// router.put(
//     "/students/:studentId/lesson/:lessonId",
//     ensureAuth,
//     teacherController.updateLesson
// );

// // delete a lesson plan
// router.delete(
//     "/students/:studentId/lesson/:lessonPlanId",
//     ensureAuth,
//     // todo: controller to delete a lesson plan as a teacher
//     teacherController.deleteLesson
// );

module.exports = router;
