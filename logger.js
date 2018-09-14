// (function(exports, require, module, __filename, __dirname) {
console.log(__filename);
console.log(__dirname);
console.log(module);
var url = "http://mylogger.io./log";

function log(message) {
  // send an HTTP request
  console.log(message);
}

// instead of creating an object namely exports.log
// if the module has only one function we can export the function directly
// like belwo
//module.exports = log;
exports.log = log;
// module.exports.log = log;
// module.exports.endpoint = url; //information detail
// });
