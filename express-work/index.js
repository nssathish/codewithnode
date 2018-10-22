const Joi = require("joi");
const express = require("express");

//express middleware functions
const morgan = require('morgan')
const helmet = require('helmet')

const app = express();

//custom middleware
const logger = require('./logger')
const auth = require('./auth')

//installing built-in middleware
app.use(express.json());
app.use(express.urlencoded( { extended: true})) //it allow POST information as url encoded form data like 'key=value&key=value&key=value' in the url
app.use(express.static('public'));

app.use(morgan('tiny'))
app.use(helmet())

//installing custom middleware
app.use(logger)
app.use(auth)

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
