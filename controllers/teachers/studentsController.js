const Teacher = require("../../models/Teacher");
const Student = require("../../models/Student");
const Lesson = require("../../models/Lesson");

module.exports = {
    getStudent: async (req, res) => {
        try {
            const teacher = await Teacher.findById(req.user.id);
            const student = await Student.findById(req.params.studentId);
            const lessons = await Lesson.find({
                student: req.params.studentId,
            });
            console.log(lessons);

            if (!student) {
                req.flash("errors", {
                    msg: "student not found",
                });
                return res.redirect("/teachers/dashboard");
            }

            res.render("teachers/students/profile", {
                student: student,
                lessons: lessons,
                teacher: teacher,
            });
        } catch (error) {
            console.log(error);
            req.flash("errors", {
                msg: "An error occurred while fetching that student.",
            });
            res.redirect("/teachers/dashboard");
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

            res.render("teachers/students/new", {
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
            // create a new student
            const student = await Student.create({
                name: req.body.name,
                email: req.body.email,
                teacher: req.user.id,
            });
            console.log("student created successfully");
            // update the teacher to include the new student

            await Teacher.findByIdAndUpdate(
                req.user.id,
                { $push: { students: student._id } },
                { new: true }
            );

            res.redirect("/teachers/dashboard");
        } catch (error) {
            console.log(error);
            res.redirect("/teachers/dashboard");
        }
    },

    // todo: getEditStudentForm
    // todo: updateStudent

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
