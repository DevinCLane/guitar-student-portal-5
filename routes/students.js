const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students");
const { ensureAuth } = require("../middleware/auth");

// view a single student
router.get("/student/:id", ensureAuth, studentController.getStudent);

module.exports = router;
