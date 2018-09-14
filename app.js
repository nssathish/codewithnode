const logger = require("./logger");
// console.log(logger);

// logger = 1;
// logger.log("sathish");

// if a fucntion is exported directly via 'require'
// we can call the function directly

logger.log("sathish");

// learing the node's path module
const pathObj = require("./learning node modules/path_module");
logger.log(pathObj);
