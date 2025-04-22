const Lesson = require("../../models/Lesson");
const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
const formatDate = require("../../utils/formatDate");
const cloudinary = require("../../middleware/cloudinary");

module.exports = {
    getNewLessonForm: async (req, res) => {
        try {
            const student = await Student.findById(req.params.studentId);
            const teacher = await Teacher.findById(req.user.id);

            if (!student) {
                req.logout(() => {
                    req.flash("errors", { msg: "Student not found." });
                    res.redirect("/login");
                });
                return;
            }

            res.render("teachers/lessons/new", {
                student: student,
                teacher: teacher,
            });
        } catch (error) {
            console.log(error);
            req.flash("errors", {
                msg: "An error occurred while loading the new student form.",
            });
            res.redirect("/student/profile");
        }
    },
    createLesson: async (req, res) => {
        try {
            let imageData = {};
            if (req.file) {
                imageData = await cloudinary.uploader.upload(req.file.path);
            }

            const lesson = await Lesson.create({
                date: req.body.date,
                content: req.body.content,
                image: imageData.secure_url || null,
                cloudinaryId: imageData.public_id || null,
                teacher: req.user.id,
                student: req.params.studentId,
            });

            await Student.findByIdAndUpdate(
                req.params.studentId,
                { $push: { lessons: lesson._id } },
                { new: true }
            );

            res.redirect(`/teachers/students/${req.params.studentId}`);
        } catch (error) {
            console.log(error);
        }
    },

    getLesson: async (req, res) => {
        try {
            const lesson = await Lesson.findById(req.params.lessonId);
            formatDate(lesson);
            const teacher = await Teacher.findById(req.user.id);
            const student = await Student.findById(req.params.studentId);
            res.render("teachers/lessons/show", {
                lesson: lesson,
                teacher: teacher,
                student: student,
            });
        } catch (error) {
            console.log(error);
        }
    },
    deleteLesson: async (req, res) => {
        try {
            // Find lesson by id
            let lesson = await Lesson.findById({ _id: req.params.lessonId });
            // Delete image from cloudinary
            if (lesson.cloudinaryId) {
                await cloudinary.uploader.destroy(lesson.cloudinaryId);
            }
            // Delete post from db
            await lesson.deleteOne({ _id: req.params.lessonId });
            console.log("Deleted Lesson Plan");
            res.redirect(`/teachers/students/${req.params.studentId}`);
        } catch (err) {
            res.redirect(
                `/teachers/students/${req.params.studentId}/lessons/${req.params.lessonId}`
            );
        }
    },
};
