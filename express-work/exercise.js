const debug = require("debug")("app:vidly");
// console.log(debug); //by default debugger is disabled even if we import debug package

if (!debug.enabled) {
  debug.enabled = true;
  console.log("Debugger enabled...");
}

debug("before");
notifyCustomer();
debug("after");

async function notifyCustomer() {
  try {
    const customer = await getCustomer(1);
    debug("Customer: ", customer);
    const movies = await getTopMovies(customer);
    debug("Top Movies: ", movies);
    const moviesSent = await SendEmail(customer.email, movies);
  } catch (err) {
    debug("Error", err.message);
  }
}

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      debug("Getting the customer details");
      resolve({
        id: id,
        name: "Sathish",
        isGold: false,
        email: "sathish@email.com"
      });
    }, 2000);
  });
}

function getTopMovies(customer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (customer.isGold) {
        debug("Getting top movies for gold customer");
        resolve(["movie1", "movie2"]);
      } else {
        debug("Getting top movies for non-gold customer");
        resolve(["movie3", "movie4"]);
      }
    }, 2000);
  });
}

function SendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email !== "") {
        resolve(movies);
        debug("Email Sent..");
      } else {
        debug("Email id invalid");
      }
    }, 2000);
  });
}
