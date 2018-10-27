const Joi = require("joi");
const express = require("express");
const config = require("config");
const courses = require("./routes/courses");
const home = require("./routes/home");

//the debugging namespace can be only one to make the debug call handy**
//the debugging namespace can be anything
//The namespace call is also based upon the env DEBUG
//DEBUG=app:startup
//DEBUG=app:db
//DEBUG=app:startup,app:db
const startupDebugger = require("debug")("app:startup"); //this app:startup is a namespace chosen for application
const dbDebugger = require("debug")("app:db"); //this app:db is a namespace chosen for db related changes and debugging

//express middleware functions
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

//custom middleware
const logger = require("./logger");
const auth = require("./auth");

//Templating engines 'pug', 'mustasche' , 'EJS'
//we are using pug
app.set("view engine", "pug");
app.set("views", "./views");
//installing built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //it allows POST information as url encoded form data like 'key=value&key=value&key=value' in the url
app.use(express.static("public"));

//Any routes that starts with /api/courses redirect to routes/courses.js
app.use("/api/courses", courses);
app.use("/", home);
//anything can be chosen here to check the environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`env: ${app.get("env")}`);
//startupDebugger(`NODE_ENV: ${process.env.NODE_ENV}`); // we cannot use the backtick `` in debug functions (its specific to console.log)
//though we are not doing any DB operation here to debug, let's assume we did
//dbDebugger(`env: ${app.get("env")}`); // we cannot use the backtick `` in debug functions (its specific to console.log)

//any middleware or routing can be used based on the environment we have chosen
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

//DB work ..
dbDebugger("Connected to database");

//For the enterprise applications we need to configure the environment dynamically based on the config files
//For that we are going to use the npm package 'config'
//P.S: the configuration file names should '.json' of NODE_ENV name, the 'config' package works that way (case insensitive)
//and all the configuration files should be under ./config folder
console.log(`Name of the App: ${config.get("name")}`);
console.log(`Host: ${config.get("mail.host")}`);

//Now to store the password information that are required for the application we need to
//create a file called 'custom-environment-variables.json' as per the 'config' package
//this will map the environment variables to the ones used in the json file
console.log(`password: ${config.get("credentials.password")}`);

app.use(helmet());

//installing custom middleware
app.use(logger);
app.use(auth);

console.log("Env port: " + process.env.PORT);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));
