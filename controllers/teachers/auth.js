const passport = require("passport");
const validator = require("validator");
const Teacher = require("../../models/Teacher");

exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect("/teachers/dashboard");
    }
    res.render("teachers/login", {
        title: "Login",
    });
};

exports.postLogin = (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
        validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.password))
        validationErrors.push({ msg: "Password cannot be blank." });

    if (validationErrors.length) {
        req.flash("errors", validationErrors);
        return res.redirect("/teachers/login");
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
    });

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash("errors", info);
            return res.redirect("/teachers/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", { msg: "Success! You are logged in." });
            res.redirect(req.session.returnTo || "/teachers/dashboard");
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout(() => {
        console.log("User has logged out.");
    });
    req.session.destroy((err) => {
        if (err)
            console.log(
                "Error : Failed to destroy the session during logout.",
                err
            );
        req.user = null;
        res.redirect("/");
    });
};

exports.getSignup = (req, res) => {
    if (req.user) {
        return res.redirect("/teachers/dashboard");
    }
    res.render("/teachers/signup", {
        title: "Create Account",
    });
};

exports.postSignup = (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
        validationErrors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(req.body.password, { min: 8 }))
        validationErrors.push({
            msg: "Password must be at least 8 characters long",
        });
    if (req.body.password !== req.body.confirmPassword)
        validationErrors.push({ msg: "Passwords do not match" });

    if (validationErrors.length) {
        req.flash("errors", validationErrors);
        return res.redirect("/teachers/signup");
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
    });

    const teacher = new Teacher({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    Teacher.findOne(
        { $or: [{ email: req.body.email }, { name: req.body.name }] },
        (err, existingUser) => {
            if (err) {
                console.log("database error:", err);
                return next(err);
            }
            if (existingUser) {
                req.flash("errors", {
                    msg: "Account with that email address or name already exists.",
                });
                return res.redirect("teachers/signup");
            }
            teacher.save((err) => {
                if (err) {
                    return next(err);
                }
                req.logIn(teacher, (err) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect("/teachers/dashboard");
                });
            });
        }
    );
};
