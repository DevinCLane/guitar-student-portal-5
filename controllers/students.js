const Student = require("../models/Student");
const LessonPlan = require("../models/LessonPlan");

module.exports = {
    getStudent: async (req, res) => {
        try {
            const student = await Student.findById(req.params.id);
            const lessonPlans = await LessonPlan.find({
                student: req.params.id,
            });
            res.render("student/profile", {
                student: student,
                lessonPlans: lessonPlans,
            });
        } catch (error) {
            console.log(error);
        }
    },
};
