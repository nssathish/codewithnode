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

//learning the node's OS module
const osObj = require("./learning node modules/os_module");
logger.log(osObj);
logger.log("Total memory: " + osObj.osTotalMem);
logger.log("Free Memory: " + osObj.osFreeMem);
