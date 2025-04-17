const Student = require("../../models/Student");
const Lesson = require("../../models/Lesson");
const passport = require("passport");
const validator = require("validator");

module.exports = {
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
            return res.redirect("/login");
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
            gmail_remove_dots: false,
        });

        passport.authenticate("student-local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.flash("errors", info);
                return res.redirect("/students/login");
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
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
