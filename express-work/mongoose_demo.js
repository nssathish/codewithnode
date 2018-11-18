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
  isPublished: Boolean
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
    isPublished: false
  });

  //save model
  const result = await course.save();
  debug(result);
}
// createCourse();

async function getCourses() {
  var document = await Course.findById("5bf1866dbada17152b3f6225");
  document = await Course.find({ author: "kumar", isPublished: false });
  debug(document);
}

getCourses();
