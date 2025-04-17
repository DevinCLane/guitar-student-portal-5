module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("/");
        }
    },
    ensureGuest: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("/dashboard");
        }
    },
    ensureStudentAuth: function (req, res, next) {
        if (
            req.isAuthenticated() &&
            req.user.constructor.modelName === "Student"
        ) {
            return next();
        }
        res.redirect("/students/login");
    },
};
