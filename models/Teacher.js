const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
});

module.exports = mongoose.model("Teacher", TeacherSchema);
