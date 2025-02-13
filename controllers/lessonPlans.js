const LessonPlan = require("../models/LessonPlan");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
    createLessonPlan: async (req, res) => {
        try {
            let imageData = {};
            if (req.file) {
                imageData = await cloudinary.uploader.upload(req.file.path);
            }

            await LessonPlan.create({
                title: req.body.title,
                content: req.body.content,
                image: imageData.secure_url || null,
                cloudinaryId: imageData.public_id || null,
                teacher: req.user.id,
                student: req.params.studentId,
            });
            res.redirect(`student/${req.params.studentId}`);
        } catch (error) {
            console.log(error);
        }
    },

    getLessonPlan: async (req, res) => {
        try {
            const lessonPlan = await LessonPlan.findById(req.params.id);
            res.render("lessonPlan/lesson", { lessonPlan: lessonPlan });
        } catch (error) {
            console.log(error);
        }
    },
    deleteLessonPlan: async (req, res) => {
        try {
            // Find post by id
            let lessonPlan = await LessonPlan.findById({ _id: req.params.id });
            // Delete image from cloudinary
            if (lessonPlan.cloudinaryId) {
                await cloudinary.uploader.destroy(post.cloudinaryId);
            }
            // Delete post from db
            await lessonPlan.remove({ _id: req.params.id });
            console.log("Deleted Lesson Plan");
            res.redirect(`student/${req.params.studentId}`);
        } catch (err) {
            res.redirect(`student/${req.params.studentId}`);
        }
    },
};
