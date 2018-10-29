const express = require("express");
const router = express.Router();

var genres = [
  { id: 1, name: "Comedy" },
  { id: 2, name: "Rom-com" },
  { id: 3, name: "sit-com" },
  { id: 4, name: "spoof" }
];

router.get("/", (req, res) => {
  res.send(JSON.stringify(genres));
});
// C - R - U - D
// C - Create
router.post("/", (req, res) => {
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

// R - Read
//GET genre by id
router.get("/:id", (req, res) => {
  //const genre = genres.filter(g => g.id === parseInt(req.params.id));
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send(`genre not found for ${req.params.id}`);
  res.send(genre);
});

// U - Update
//PUT - update the name of a genre
router.put("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send(`ID ${req.params.id} to update the genre is not found`);
  const { error } = validateGenres(req.body);
  if (error) {
    return res
      .status(400)
      .send("Name of the genre should be atleast 3 letters");
  }

  genre.name = req.body.name;
  return res.send(JSON.stringify(genres));
});

// D - Delete
//DELETE - a genre
router.delete("/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (genre) {
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    return res.send(JSON.stringify(genres));
  }
  return res
    .status(404)
    .send(`Given ID ${req.params.id} is not found in the genres`);
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

module.exports = router;
