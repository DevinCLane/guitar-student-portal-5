const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const lessonPlansController = require("../controllers/lessonPlans");
const { ensureAuth } = require("../middleware/auth");

router.get("/:id", ensureAuth, lessonPlansController.getLessonPlan);

router.post(
    "/createLessonPlan/:studentId",
    upload.single("file"),
    lessonPlansController.createLessonPlan
);

router.delete(
    "/deleteLessonPlan/:id/:studentId",
    lessonPlansController.deleteLessonPlan
);

module.exports = router;
