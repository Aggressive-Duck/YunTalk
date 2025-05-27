const pool = require("./pool");

// async function getAllUsernames() {
//   const { rows } = await pool.query("SELECT user FROM users");
//   return rows;
// }

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

function insertRating( user_id, title, content, image_name ) {
  return new Promise((resolve, reject) => {
    const createdAt = new Date();
    pool.query(
      "INSERT INTO ratings (user_id, title, content, image_name, created_at) VALUES (?, ?, ?, ?, ?)",
      [user_id, title, content, image_name, createdAt],
      (err, results) => {
        if (err) return reject(err);
        resolve(results); 
      }
    );
  });
}

function getRatingsWithPageScroll(offset = 0, limit = 4) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM ratings ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [limit, offset],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    )
  })
}

function getTotalRatingsCount() {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT COUNT(*) as total FROM ratings",
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0].total);
      })
  })
}

// async function insertUsername(username) {
//   await pool.query("INSERT INTO users (user) VALUES ($1)", [username]);
// }

module.exports = {
  getAllUserAuthInfo,
  getLatestRatingId,
  insertRating,
  getRatingsWithPageScroll,
  getTotalRatingsCount
};
