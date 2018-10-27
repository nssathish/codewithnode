const express = require("express");
//const app = express();
const router = express.Router();

var courses = [
  { id: 1, name: "Course1" },
  { id: 2, name: "Course2" },
  { id: 3, name: "Course3" },
  { id: 4, name: "Course4" }
];

//router.get("/api/courses", (req, res) => {
//moving from /api/courses --> "/" because in index.js
//we have used a router condition => app.use('/api/courses','courses')
router.get("/", (req, res) => {
  res.send(JSON.stringify(courses));
});

router.get("/:year/:month", (req, res) => {
  res.send(
    JSON.stringify({ "field params": req.params, "query params": req.query })
  );
});

//GET course by ID
router.get("/:id", (req, res) => {
  const result = courses.find(c => c.id === parseInt(req.params.id));
  if (!result)
    return res.status(404).send("The course for the given ID is not found");
  res.send(result);
});

//POST a new course
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
