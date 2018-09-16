const logger = require("./logger");
// console.log(logger);

// logger = 1;
// logger.log("sathish");

// if a fucntion is exported directly via 'require'
// we can call the function directly
logger.eventName = "messageLogged";
logger.log("sathish");
console.log(logger);

//learing the node's path module
console.log("1.Learning path module");
const pathObj = require("./learning node modules/path_module");
logger.log(pathObj);
console.log("-------");

//learning the node's OS module
console.log("2.Learning os module");
const osObj = require("./learning node modules/os_module");
logger.log(osObj);
console.log("Total memory: " + osObj.osTotalMem);
console.log("Free Memory: " + osObj.osFreeMem);
console.log("-------");

//learning the node's filesystem module
console.log("3.Learning filesystem module");
const files = require("./learning node modules/fs_module");
console.log("-------");

//loearning the nodes events module
console.log("4.Learning events module");
const events = require("./learning node modules/event_module");

//creating a logging event module to get familiar with the syntax
console.log("5.Creating a logging event");
const loggingEvent = require("./learning node modules/logging_event");
