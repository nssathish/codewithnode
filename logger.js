// (function(exports, require, module, __filename, __dirname) {
// console.log(__filename);
// console.log(__dirname);
// console.log(module);
const EventEmitter = require("events");
const events = new EventEmitter();
var eventName;
var url = "http://mylogger.io./log";

events.on(eventName, eventArg => {
  console.log(eventArg);
});
function log(message) {
  // send an HTTP request
  // console.log(message);
  console.log(eventName);
  events.emit(eventName, { id: 1, url: url, message: message });
}

// instead of creating an object namely exports.log
// if the module has only one function we can export the function directly
// like belwo
//module.exports = log;
exports.log = log;
exports.eventName = eventName;
// module.exports.log = log;
// module.exports.endpoint = url; //information detail
// });
