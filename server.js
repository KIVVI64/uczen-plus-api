require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  const allowedOrigins = ["http://localhost:8080", "https://ibnp.soniw.pl"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  //res.setHeader('Access-Control-Allow-Origin', allowedOrigins);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a root route
app.get("/", (req, res) => {
  res.send("Udaje dobrze napisane API :) \n CurrentOrigin: " + req.headers.origin);
});

// Require API routes
//const templateRoutes = require('./src/routes/template.routes')
const clicksRoutes = require("./src/routes/clicks.routes");
const teacherRoutes = require("./src/routes/teacher.routes");
const teacherInfoRoutes = require("./src/routes/teacher-info.routes");
const teacherFactsRoutes = require("./src/routes/teacher-facts.routes");
const teacherCommentRoutes = require("./src/routes/teacher-comment.routes");
const pointRoutes = require("./src/routes/point.routes");
const schoolRoutes = require("./src/routes/school.routes");
const userRoutes = require("./src/routes/user.routes");

// using as middleware
app.use("/uczen-plus-api/v1/clicks", clicksRoutes);
app.use("/uczen-plus-api/v1/teacher", teacherRoutes);
app.use("/uczen-plus-api/v1/teacher_info", teacherInfoRoutes);
app.use("/uczen-plus-api/v1/teacher_facts", teacherFactsRoutes);
app.use("/uczen-plus-api/v1/teacher_comment", teacherCommentRoutes);
app.use("/uczen-plus-api/v1/point", pointRoutes);
app.use("/uczen-plus-api/v1/school", schoolRoutes);
app.use("/uczen-plus-api/v1/user", userRoutes);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
