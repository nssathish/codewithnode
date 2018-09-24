const express = require("express");
const app = express();

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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));
