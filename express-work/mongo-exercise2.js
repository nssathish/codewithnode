const mongoose = require("mongoose");
const debug = require("debug")("mongo-ex2");

if (debug.enabled == false) debug.enabled = true;

//1.Create connection
mongoose
  .connect(
    "mongodb://localhost/mongo-exercises",
    { useNewUrlParser: true }
  )
  .then(() => debug("Connected to mongo-exercises DB successfully!"))
  .catch(err => debug("Connection to mongo-exercises failed!", err));

//2.Create Schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
  tags: [String],
  price: Number,
  date: { type: Date, default: Date.now }
});

//3.Create Model
const aCourse = mongoose.model("Courses", courseSchema);

//4.Query databse collections
async function getCourses() {
  return await aCourse
    .find({ isPublished: true, tags: { $in: ["frontend", "backend"] } })
    .sort("-price")
    .select({ name: 1, author: 1 });
}
async function run() {
  debug(await getCourses());
}
run();
