console.log("Before");
getUser(1, user => {
  console.log("User: ", user);
  const username = user.gitHubUsername;
  getRepositories(username, repositories => {
    console.log("Repositories: ", repositories);
  });
});

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading user from the database...");
    callback({ id: id, gitHubUsername: "sathish" });
  }, 2000);
}
function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Getting repositories from github");
    var repos = { username: "", repositories: [] };
    repos.username = username;
    repos.repositories = ["repo1", "repo2", "repo3"];
    callback(repos);
  }, 2000);
}

console.log("After");
