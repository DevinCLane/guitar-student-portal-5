const Student = require("../../models/Student");
const Lesson = require("../../models/Lesson");
const Teacher = require("../../models/Teacher");
const passport = require("passport");
const validator = require("validator");
const formatDate = require("../../utils/formatDate");

module.exports = {
    getIndex: (req, res) => {
        res.render("students/index", {
            title: "Student Portal",
        });
    },
    setupPassword: (req, res) => {
        res.render("students/setup-password");
    },

    savePassword: async (req, res) => {
        try {
            const student = await Student.findById(req.user.id);
            if (!student || !student.needsPassword) {
                return res.redirect("/students/login");
            }

            if (req.body.password !== req.body.confirmPassword) {
                req.flash("error", "Passwords do not match");
                return res.redirect("/students/setup-password");
            }

            student.password = req.body.password;
            student.needsPassword = false;
            await student.save();

            req.flash("success", "Password set successfully");
            res.redirect("/students/profile");
        } catch (err) {
            console.error(err);
            req.flash("error", "Error setting password");
            res.redirect("/students/setup-password");
        }
    },

    getLoginForm: (req, res) => {
        res.render("students/login");
    },

    login: (req, res, next) => {
        const validationErrors = [];
        if (!validator.isEmail(req.body.email)) {
            validationErrors.push({
                msg: "Please enter a valid email address.",
            });
        }

        if (validationErrors.length) {
            req.flash("errors", validationErrors);
            return res.redirect("/students/login");
        }

        req.body.email = validator.normalizeEmail(req.body.email, {
            gmail_remove_dots: false,
        });

        // First check if this is a first-time student login
        Student.findOne({ email: req.body.email }, async (err, student) => {
            if (err) return next(err);

            if (!student) {
                req.flash("errors", {
                    msg: "No student account found with that email. Please check with your teacher.",
                });
                return res.redirect("/students/login");
            }

            // Handle first-time login (no password needed)
            if (student && student.needsPassword) {
                return req.logIn(student, (err) => {
                    if (err) return next(err);
                    return res.redirect("/students/setup-password");
                });
            }

            // Regular login with password check
            passport.authenticate("student-local", (err, student, info) => {
                if (err) return next(err);
                if (!student) {
                    req.flash("errors", info);
                    return res.redirect("/students/login");
                }
                req.logIn(student, (err) => {
                    if (err) return next(err);
                    req.flash("success", {
                        msg: "Success! You are logged in.",
                    });
                    res.redirect(req.session.returnTo || "/students/profile");
                });
            })(req, res, next);
        });
    },

    getProfile: async (req, res) => {
        try {
            const student = await Student.findById(req.user._id);
            const teacher = await Teacher.findById(req.user.teacher);
            const lessons = await Lesson.find({
                student: req.user._id,
            }).sort("date");

            formatDate(lessons);
            res.render("students/profile", { student, lessons, teacher });
        } catch (error) {
            console.error(error);
            res.render("students/login");
        }
    },
};
