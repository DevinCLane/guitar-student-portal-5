const Student = require("../models/Student");

module.exports = {
    getDashboard: async (req, res) => {
        try {
            const students = await Student.find({ teacher: req.user.id });
            res.render("teacher/dashboard"), { students: students };
        } catch (error) {
            console.log(error);
        }
    },

    createStudent: async (req, res) => {
        try {
            await Student.create({
                email: req.body.email,
                teacher: req.user.id,
            });
            res.redirect("teacher/dashboard");
        } catch (error) {
            console.log(error);
        }
    },
    deleteStudent: async (req, res) => {
        try {
            await Student.deleteOne({ _id: req.params.id });
            res.redirect("teacher/dashboard");
        } catch (error) {
            console.log(error);
            res.redirect("teacher/dashboard");
        }
    },
};
