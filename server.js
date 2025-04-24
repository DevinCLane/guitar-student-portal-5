const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const studentRoutes = require("./routes/students");
const teacherRoutes = require("./routes/teachers");

// server port and host
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        cookie: {
            // force HTTPS in production
            secure: process.env.NODE_ENV === "production",
            // 1 week
            maxAge: 7 * 24 * 60 * 60 * 1000,
        },
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

// handle source maps
app.get("*.js.map", (req, res) => {
    res.status(404).end();
});

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
// app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/students", studentRoutes);

//Server Running
app.listen(PORT, HOSTNAME, () => {
    console.log(
        `Server is running on http://${HOSTNAME}:${PORT}, you better catch it!`
    );
});
