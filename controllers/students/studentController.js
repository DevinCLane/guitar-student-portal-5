const Student = require("../../models/Student");
const Lesson = require("../../models/Lesson");
const passport = require("passport");
const validator = require("validator");

module.exports = {
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
        if (!validator.isEmail(req.body.email))
            validationErrors.push({
                msg: "Please enter a valid email address.",
            });
        if (validator.isEmpty(req.body.password))
            validationErrors.push({ msg: "Password cannot be blank." });

        if (validationErrors.length) {
            req.flash("errors", validationErrors);
            return res.redirect("/students/login");
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
            gmail_remove_dots: false,
        });

        passport.authenticate("student-local", (err, student, info) => {
            if (err) {
                return next(err);
            }
            if (!student) {
                req.flash("errors", info);
                return res.redirect("/students/login");
            }
            req.logIn(student, (err) => {
                if (err) {
                    return next(err);
                }

                if (student.needsPassword) {
                    return res.redirect("/students/setup-password");
                }

                req.flash("success", { msg: "Success! You are logged in." });
                res.redirect(req.session.returnTo || "/students/profile");
            });
        })(req, res, next);
    },

    getProfile: async (req, res) => {
        try {
            const student = await Student.findById(req.user._id);
            const lessons = await Lesson.find({
                student: req.user._id,
            }).sort("date");

            formatDate(lessons);
            res.render("students/profile", { student, lessons });
        } catch (error) {
            console.error(error);
            res.render("students/login");
        }
    },
};
