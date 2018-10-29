const express = require("express");
const app = express();
const genres = require("./routes/genres");
const home = require("./routes/home");
const joi = require("joi"); //for validation rules
app.use(express.json()); //to let node know about the request body

app.set("view engine", "pug");
app.set("views", "./views");

app.use("/api/genres", genres);
app.use("/", home);
//genres
const port = process.env.PORT || "3000";
app.listen(port, () => console.log(`Listening to port ${port}`));
