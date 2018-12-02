const mongoose = require("mongoose");
const debug = require("debug")("mongo-ex3");
if (debug.enabled == false) debug.enabled = true;

//1.create mongo db connection
mongoose
  .connect(
    "mongodb://localhost/mongo-exercises",
    { useNewUrlParser: true }
  )
  .then(() => debug("Connected to the mongo-exercises DB"))
  .catch(err => debug("Connection to mongo-exercises DB failed", err));

//2.create schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
  tags: [String],
  date: { type: Date, default: Date.now },
  price: Number
});

//3.create model
const aCourse = mongoose.model("Courses", courseSchema);

//4.Query db collections
async function getCourse() {
  return await aCourse.find().or([
    {
      isPublished: true,
      price: { $gte: 15 }
    },
    {
      name: /by/i
    }
  ]);
}
async function run() {
  const courses = await getCourse();
  debug(courses);
}
run();
