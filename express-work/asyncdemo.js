const debug = require("debug")("app:async");

if (debug.enabled === false) {
  debug.enabled = true;
  console.log("Debugger enabled...");
}

debug("Before");
getUser(1, getRepositories);
debug("After");

function getCommits(repo) {
  debug("Repos", repo);
  getCommits(repo, displayCommits);
}

function getUser(id, callback) {
  setTimeout(() => {
    debug("Reading user from the database...");
    callback({ id: id, gitHubUsername: "sathish" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    debug("Getting repositories from github");
    const repos = ["repo1", "repo2", "repo3"];
    console.log(callback);
    callback(repos);
  }, 2000);
}
function getRepositories(user) {
  //since everything is async here when gitRepositories is called 'user' object will be undefined
  if (user !== undefined) {
    debug("User", user);
    getRepositories(user.gitHubUsername, getCommits);
  }
}

function getCommits(repo, callback) {
  setTimeout(() => {
    callback(["commit1", "commit2", "commit3"]);
  }, 2000);
}
function displayCommits(commits) {
  debug(commits);
}
