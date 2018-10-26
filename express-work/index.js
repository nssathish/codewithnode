const Joi = require("joi");
const express = require("express");
const config = require("config");

//express middleware functions
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

//custom middleware
const logger = require("./logger");
const auth = require("./auth");

//installing built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //it allows POST information as url encoded form data like 'key=value&key=value&key=value' in the url
app.use(express.static("public"));

//anything can be chosen here to check the environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`env: ${app.get("env")}`);

//any middleware or routing can be used based on the environment we have chosen
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}
//For the enterprise applications we need to configure the environment dynamically based on the config files
//For that we are going to use the npm package 'config'
//P.S: the configuration file names should '.json' of NODE_ENV name, the 'config' package works that way (case insensitive)
//and all the configuration files should be under ./config folder
console.log(`Name of the App: ${config.get("name")}`);
console.log(`Host: ${config.get("mail.host")}`);

//Now to store the password information that are required for the application we need to
//create a file called 'custom-environment-variables.json' as per the 'config' package
//this will map the environment variables to the ones used in the json file
console.log(`password: ${config.get("credentials.password")}`);

app.use(helmet());

//installing custom middleware
app.use(logger);
app.use(auth);

var courses = [
  { id: 1, name: "Course1" },
  { id: 2, name: "Course2" },
  { id: 3, name: "Course3" },
  { id: 4, name: "Course4" }
];

app.get("/", (req, res) => {
  res.send("Hello world");
  res.end();
});

app.get("/api/courses", (req, res) => {
  res.send(JSON.stringify(courses));
});

app.get("/api/courses/:year/:month", (req, res) => {
  res.send(
    JSON.stringify({ "field params": req.params, "query params": req.query })
  );
});

//GET course by ID
app.get("/api/courses/:id", (req, res) => {
  const result = courses.find(c => c.id === parseInt(req.params.id));
  if (!result)
    return res.status(404).send("The course for the given ID is not found");
  res.send(result);
});

//POST a new course
app.post("/api/courses", (req, res) => {
  //For validation we can use traditional if..then..else..then
  //or
  //"joi" node package can be use
  // const validation = validateCourse(req.body);

  //Object destructuring
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const result = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(result);
  res.send(result);
});

//PUT ie., update a course for the ID :id
app.put("/api/courses/:id", (req, res) => {
  //Check if the course exits for the ID
  //else return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course for the given ID is not found");

  //check if the course body has name
  //else return 400
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //else update the course
  course.name = req.body.name;

  //return the course
  res.send(course);
});

//DELETE ie., delete the course for the ID :id
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course for the given ID is not found");
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}
console.log("Env port: " + process.env.PORT);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));
