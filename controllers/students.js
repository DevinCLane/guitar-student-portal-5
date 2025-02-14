const Student = require("../models/Student");
const LessonPlan = require("../models/LessonPlan");
const Teacher = require("../models/Teacher");

module.exports = {
    getStudent: async (req, res) => {
        try {
            const student = await Student.findById(req.params.id);
            const lessonPlans = await LessonPlan.find({
                student: req.params.id,
            });
            const teacher = await Teacher.findById({ _id: req.user.id });
            res.render("student/profile", {
                student: student,
                lessonPlans: lessonPlans,
                teacher: teacher,
            });
        } catch (error) {
            console.log(error);
        }
    },
};
