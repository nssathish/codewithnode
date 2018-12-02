const mongoose = require("mongoose");
const debug = require("debug")("mongo-exercise");
if (debug.enabled == false) debug.enabled = true;

//1.Entry
//connection to the DB
mongoose
  .connect(
    "mongodb://localhost/mongo-exercises",
    {
      useNewUrlParser: true
    }
  )
  .then(() => debug("Connected to mongo-exercises DB"))
  .catch(err => debug("Connection to mongo-exercises DB failed", err));

//2.Create schema object
//using mongoose schema
const coursesSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
  date: { type: Date, default: Date.now },
  tags: [String, String]
});

//3.Create model
//using mongoose.model
const aCourse = mongoose.model("courses", coursesSchema);

//4.Query using model object
//all querying asynchronous
async function getCourses() {
  const courses = await aCourse
    .find()
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });

  debug(courses);
}
getCourses();
