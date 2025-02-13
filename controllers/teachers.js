const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

module.exports = {
    getDashboard: async (req, res) => {
        try {
            const students = await Student.find({ teacher: req.user.id });
            console.log("Students:", students); // Debugging log

            const teacher = await Teacher.findById({ _id: req.user.id });
            console.log("Teacher Query:", { _id: req.user.id }); // Debugging log
            console.log("Teacher:", teacher); // Debugging log

            if (!teacher) {
                req.logout(() => {
                    req.flash("errors", { msg: "Teacher not found." });
                    res.redirect("/login");
                });
                return;
            }

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

    getNewStudentForm: async (req, res) => {
        try {
            const teacher = await Teacher.findById({ _id: req.user.id });
            console.log("Teacher Query:", { _id: req.user.id }); // Debugging log
            console.log("Teacher:", teacher); // Debugging log

            if (!teacher) {
                req.logout(() => {
                    req.flash("errors", { msg: "Teacher not found." });
                    res.redirect("/login");
                });
                return;
            }

            res.render("teachers/newStudent", {
                teacher: teacher,
            });
        } catch (error) {
            console.log(error);
            req.flash("errors", {
                msg: "An error occurred while loading the new student form.",
            });
            res.redirect("/teachers/dashboard");
        }
    },

    createStudent: async (req, res) => {
        try {
            console.log("form data received:", req.body);
            await Student.create({
                name: req.body.name,
                email: req.body.email,
                teacher: req.user.id,
            });
            console.log("student created successfully");
            res.redirect("/teachers/dashboard");
        } catch (error) {
            console.log(error);
            res.redirect("/teachers/dashboard");
        }
    },
    deleteStudent: async (req, res) => {
        try {
            await Student.deleteOne({ _id: req.params.id });
            res.redirect("/teachers/dashboard");
        } catch (error) {
            console.log(error);
            res.redirect("/teachers/dashboard");
        }
    },
};
