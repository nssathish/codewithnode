const logger = require("./logger");
// console.log(logger);

// logger = 1;
// logger.log("sathish");

// if a fucntion is exported directly via 'require'
// we can call the function directly

logger.log("sathish");

const path = require("path");
console.log(path.parse(__filename));
