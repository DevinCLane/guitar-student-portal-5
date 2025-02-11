const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

module.exports = {
    getDashboard: async (req, res) => {
        try {
            const students = await Student.find({ teacher: req.user.id });
            const teacher = await Teacher.find({ teacher: req.user.id });
            res.render("teachers/dashboard", {
                students: students,
                teacher: teacher,
            });
        } catch (error) {
            console.log(error);
        }
    },

    createStudent: async (req, res) => {
        try {
            await Student.create({
                name: req.body.name,
                email: req.body.email,
                teacher: req.user.id,
            });
            res.redirect("teachers/dashboard");
        } catch (error) {
            console.log(error);
        }
    },
    deleteStudent: async (req, res) => {
        try {
            await Student.deleteOne({ _id: req.params.id });
            res.redirect("teachers/dashboard");
        } catch (error) {
            console.log(error);
            res.redirect("teachers/dashboard");
        }
    },
};
