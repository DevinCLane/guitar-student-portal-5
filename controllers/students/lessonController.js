const Lesson = require("../../models/Lesson");
const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
const formatDate = require("../../utils/formatDate");

module.exports = {
    getLesson: async (req, res) => {
        try {
            const lesson = await Lesson.findById(req.params.lessonId);
            formatDate(lesson);
            const teacher = await Teacher.findById(req.user.id);
            const student = await Student.findById(req.params.studentId);
            res.render("students/lessons/show", {
                lesson: lesson,
                teacher: teacher,
                student: student,
            });
        } catch (error) {
            console.log(error);
        }
    },
};
