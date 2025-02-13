const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    LessonPlans: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LessonPlan",
        },
    ],
});

module.exports = mongoose.model("Student", StudentSchema);
