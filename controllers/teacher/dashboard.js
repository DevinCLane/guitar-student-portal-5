const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");

module.exports = {
    getDashboard: async (req, res) => {
        try {
            const teacher = await Teacher.findById({ _id: req.user.id });

            if (!teacher) {
                req.logout(() => {
                    req.flash("errors", { msg: "Teacher not found." });
                    res.redirect("/login");
                });
                return;
            }

            const students = await Student.find({ teacher: req.user.id });

            res.render("teachers/dashboard", {
                students: students,
                teacher: teacher,
            });
        } catch (error) {
            console.log(error);
            req.flash("errors", {
                msg: "An error occurred while loading the dashboard.",
            });
            res.redirect("/login");
        }
    },

    // todo: get profile

    // todo: update profile
};
