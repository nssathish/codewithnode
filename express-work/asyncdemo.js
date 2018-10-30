const debug = require("debug")("app:async");

if (debug.enabled === false) {
  debug.enabled = true;
  console.log("Debugger enabled...");
}

debug("Before");
// debug(getUser(1)); //output a dump of the Promise object => 'Promise { <pending> }' is the output

getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log(commits))
  .catch(err => console.log(err.message));

debug("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      debug("Reading user from the database...");
      resolve({ id: id, gitHubUsername: "sathish" });
    }, 2000);
  });
}
function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      debug("Getting repositories from github");
      const repos = ["repo1", "repo2", "repo3"];
      resolve(repos);
    }, 2000);
  });
}
function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      debug("Getting commits from the repo", repo);
      resolve(["commit1", "commit2", "commit3"]);
    }, 2000);
  });
}
