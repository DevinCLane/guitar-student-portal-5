const mongoose = require("mongoose");

const LessonPlanSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: function () {
            return !!this.cloudinaryId;
        },
    },
    cloudinaryId: {
        type: String,
        required: function () {
            return !!this.image;
        },
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", LessonPlanSchema);
