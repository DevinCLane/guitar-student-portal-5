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
    ensureNeedsPassword: async (req, res, next) => {
        if (!req.user || !req.user.needsPassword) {
            return res.redirect("/students/profile");
        }
        next();
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
