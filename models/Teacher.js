const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const TeacherSchema = new mongoose.Schema({
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
    password: String,
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
});

TeacherSchema.pre("save", function save(next) {
    const teacher = this;
    if (!teacher.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(teacher.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            teacher.password = hash;
            next();
        });
    });
});

// Helper method for validating teacher's password.

TeacherSchema.methods.comparePassword = function comparePassword(
    candidatePassword,
    cb
) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

module.exports = mongoose.model("Teacher", TeacherSchema);
