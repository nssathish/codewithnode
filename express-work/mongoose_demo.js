const mongoose = require("mongoose");
const debug = require("debug")("mongo-ose");

//do not forget to enable the debugger
//that is disabled by default
if (!debug.enabled) debug.enabled = true;

//after running mongo daemon from terminal
//create connection to mongo db - which is a promise
mongoose
  .connect(
    "mongodb://localhost/playground",
    {
      useNewUrlParser: true
    }
  )
  .then(() => debug("Connected to MongoDB"))
  .catch(err => debug("Connection to MongoDB failed!!", err));

//create a schema - specific to mongoose package
//mongodb does not have schema concept - its a NoSQL DB
//Database - actual database
//collection - table
//document - row in the table
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

//create a model based on the schema created
//providing a name to the model (here, "Course")
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  //create a new document using the course model
  const course = new Course({
    name: "Node.js course",
    author: "kumar",
    tags: ["Nodejs", "backend"],
    isPublished: false,
    price: 20
  });

  //save model
  // const result = await course.save();
  // debug(result);
}
// createCourse()
//   .then(() => console.log("Created course schema"))
//   .catch(() => new Error("Couldn't create schema"));

async function getCourses() {
  var document = await Course.findById("5bf1866dbada17152b3f6225");
  document = await Course.find({ author: "kumar", isPublished: false });
  // debug(document);
  document = await Course.find({ author: "sathish", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  // debug(document);

  document = await Course.find({ price: { $gt: 15, $lte: 20 } });
  if (document)
    debug(
      "fetched document with price more than $15 and less than $20",
      document
    );

  // somehow the following piece of code is not working --- bummer!!
  // ok.. Mosh has corrected..
  // this logical operator works differently
  document = await Course.find()
    .or([{ price: { $gt: 10, $lte: 15 } }, { price: { $gt: 15, $lte: 20 } }])
    .and([{ price: 20 }])
    .or([{ author: /^sathish/i }]);

  document = await Course.find({ author: /sathish/i });
  debug(document);

  //.count() wil
  const documents = await Course.find({ author: "sathish" }).count();
  debug("count: ", documents);
}

getCourses();
