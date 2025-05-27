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

function getLatestRatingId() {
  return new Promise((resolve, reject) => {
    pool.query("SELECT id FROM ratings ORDER BY id DESC LIMIT 1", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function insertRating({ title, content }) {
  return new Promise((resolve, reject) => {
    const createdAt = new Date();
    pool.query(
      "INSERT INTO ratings (title, content, created_at) VALUES (?, ?, ?)",
      
      [title, content, createdAt],
      (err, results) => {
        if (err) return reject(err);
        resolve(results.insertId); // return the new row's id
      }
    );
  });
}

async function insertUsername(username) {
  await pool.query("INSERT INTO users (user) VALUES ($1)", [username]);
}

module.exports = {
  getAllUsernames,
  getAllUserAuthInfo,
  getLatestRatingId,
  insertRating,
  insertUsername
};
