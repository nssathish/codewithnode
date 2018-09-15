const logger = require("./logger");
// console.log(logger);

// logger = 1;
// logger.log("sathish");

// if a fucntion is exported directly via 'require'
// we can call the function directly

logger.log("sathish");

// learing the node's path module
logger.log("1.Learning path module");
const pathObj = require("./learning node modules/path_module");
logger.log(pathObj);
logger.log("-------");

//learning the node's OS module
logger.log("2.Learning os module");
const osObj = require("./learning node modules/os_module");
logger.log(osObj);
logger.log("Total memory: " + osObj.osTotalMem);
logger.log("Free Memory: " + osObj.osFreeMem);
logger.log("-------");

//learning the node's filesystem module
logger.log("3.Learning filesystem module");
const files = require("./learning node modules/fs_module");
logger.log("-------");

//loearning the nodes events module
logger.log("4.Learning events module");
const events = require("./learning node modules/event_module");
