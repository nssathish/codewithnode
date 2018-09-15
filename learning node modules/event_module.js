const EventEmitter = require("events");
const emitter = new EventEmitter();

//order of writing code for events
//1. Register a listener
//2. Raise an event

//First Register a listener before calling the emit
emitter.addListener("messageLogged", () => {
  console.log("Listener called");
});

//Raise an event
emitter.emit("messageLogged");
