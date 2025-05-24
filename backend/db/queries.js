const pool = require("./pool");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT user FROM users");
  return rows;
}

function getAllUserAuthInfo() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

async function insertUsername(username) {
  await pool.query("INSERT INTO users (user) VALUES ($1)", [username]);
}

module.exports = {
  getAllUsernames,
  getAllUserAuthInfo,
  insertUsername
};
