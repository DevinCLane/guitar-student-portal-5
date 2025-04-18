const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            (email, password, done) => {
                Teacher.findOne({ email: email.toLowerCase() }, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {
                            msg: `Email ${email} not found.`,
                        });
                    }
                    if (!user.password) {
                        return done(null, false, {
                            msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
                        });
                    }
                    user.comparePassword(password, (err, isMatch) => {
                        if (err) {
                            return done(err);
                        }
                        if (isMatch) {
                            return done(null, user);
                        }
                        return done(null, false, {
                            msg: "Invalid email or password.",
                        });
                    });
                });
            }
        )
    );

    passport.use(
        "student-local",
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                try {
                    const student = await Student.findOne({
                        email: email.toLowerCase(),
                    });

                    if (!student) {
                        return done(null, false, {
                            msg: `Email ${email} not found.`,
                        });
                    }

                    const isMatch = await student.comparePassword(password);

                    if (isMatch) {
                        return done(null, student);
                    }

                    return done(null, false, {
                        msg: "Invalid email or password.",
                    });
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            // Try Teacher first
            let user = await Teacher.findById(id);
            if (user) return done(null, user);

            // If not teacher, try Student
            user = await Student.findById(id);
            if (user) return done(null, user);

            // If no user found
            done(null, false);
        } catch (err) {
            done(err);
        }
    });
};
