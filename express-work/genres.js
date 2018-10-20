const express = require("express");
const app = express();

const joi = require("joi"); //for validation rules
app.use(express.json()); //to let node know about the request body

//genres
var genres = [
  { id: 1, name: "Comedy" },
  { id: 2, name: "Rom-com" },
  { id: 3, name: "sit-com" },
  { id: 4, name: "spoof" }
];
app.get("/", (req, res) => {
  res.send(JSON.stringify(genres));
});

//GET genre by id
app.get("/api/genres/:id", (req, res) => {
  //   const genre = genres.filter(g => g.id === parseInt(req.params.id));
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send(`genre not found for ${req.params.id}`);
  res.send(genre);
});
app.post("/api/genres", (req, res) => {
  // console.log(req.body)
  const { error } = validateGenres(req.body);

  if (error)
    return res.status(400).send("The genre name should be at least 3 letters");

  genres.push({
    id: genres.length + 1,
    name: req.body.name
  });
  res.send(JSON.stringify(genres));
});

const validateGenres = genre => {
  const schema = {
    name: joi
      .string()
      .min(3)
      .required()
  };
  return joi.validate(genre, schema);
};
const port = process.env.PORT || "3000";
app.listen(port, () => console.log(`Listening to port ${port}`));
