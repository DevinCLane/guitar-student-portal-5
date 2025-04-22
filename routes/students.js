const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students/studentController");
const studentLessonController = require("../controllers/students/lessonController");
const {
    ensureStudentAuth,
    ensureNeedsPassword,
} = require("../middleware/auth");

// // todo: dashboard view for a student
// // todo: individual lesson view for a student
// // todo: delete lesson plan for a student
// // todo: add comment for a student

/* 
login/signup for students
*/
router.get("/", studentController.getIndex);

// login
router.get("/login", studentController.getLoginForm);
router.post("/login", studentController.login);
router.get("/logout", studentController.logout);

// set up password
router.get(
    "/setup-password",
    ensureStudentAuth,
    ensureNeedsPassword,
    studentController.setupPassword
);
router.post(
    "/setup-password",
    ensureStudentAuth,
    ensureNeedsPassword,
    studentController.savePassword
);

// student dashboard
router.get("/profile", ensureStudentAuth, studentController.getProfile);

// student lesson views
router.get(
    "/:studentId/lessons/:lessonId",
    ensureStudentAuth,
    studentLessonController.getLesson
);
// // router.post("/:lessonId/comment", ensureAuth, studentController.addComment);

module.exports = router;
