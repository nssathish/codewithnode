const EventEmitter = require("events");

const events = new EventEmitter();

//Register a logging listener
// event logging and event arguments data: message

events.on("logging", eventArg => {
  console.log(eventArg);
});

//Raise a logging event
events.emit("logging", { data: "Raised logging event" });
