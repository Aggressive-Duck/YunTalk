const db = require("../db/queries");

async function getUsernames(req, res) {
  const usernames = await db.getAllUsernames();
  console.log("Usernames: ", usernames);
  res.send("Usernames: " + usernames.map(user => user.username).join(", "));
}

async function getUserAuthSecret(req, res) {
  const userAuthInfo = await db.getAllUserAuthInfo();
  console.log(userAuthInfo.rows);
  res.json(userAuthInfo.rows);
}

async function createUsernameGet(req, res) {
  // render the form
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

module.exports = {
  getUsernames,
  getUserAuthSecret,
  createUsernameGet,
  createUsernamePost
};
