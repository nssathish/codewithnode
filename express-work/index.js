const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

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
  const courses = ["math", "computer science", "physics"];
  //   var course_list = courses.join(",");
  res.send(JSON.stringify(courses));
  res.end();
});

app.get("/api/courses/:year/:month", (req, res) => {
  res.send(
    JSON.stringify({ "field params": req.params, "query params": req.query })
  );
});

//GET course by ID

app.get("/api/courses/:id", (req, res) => {
  const result = courses.find(c => c.id === parseInt(req.params.id));
  if (!result) res.status(404).send("The course for the given ID is not found");
  res.send(result);
});

app.post("/api/courses", (req, res) => {
  //For validation we can use traditional if..then..else..then
  //or
  //"joi" node package can be use
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const validation = Joi.validate(req.body, schema);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }
  const result = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(result);
  res.send(result);
});

console.log("Env port: " + process.env.PORT);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));
