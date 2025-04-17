const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students/studentController");
const { ensureStudentAuth } = require("../middleware/auth");

// // todo: dashboard view for a student
// // todo: individual lesson view for a student
// // todo: delete lesson plan for a student
// // todo: add comment for a student

// login
router.get("/login", studentController.getLoginForm);
router.post("/login", studentController.login);

// student dashboard
router.get("/profile", ensureStudentAuth, studentController.getProfile);
// // router.get("/:lessonId", ensureAuth, studentController.getLesson);
// // router.post("/:lessonId/comment", ensureAuth, studentController.addComment);

// module.exports = router;
