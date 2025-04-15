const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
    date: {
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

module.exports = mongoose.model("Lesson", LessonSchema);
