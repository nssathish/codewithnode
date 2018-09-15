const fs = require("fs");

//const files = fs.readdirSync("./");
var fserror = "";
var fsfiles = "";
fs.readdir("./$", (err, files) => {
  if (err) console.log(err);
  else console.log(files);
});
