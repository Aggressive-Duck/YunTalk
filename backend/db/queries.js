const pool = require("./pool");

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

function insertRating( user_id, title, content, image_name, score = 0 ) {
  return new Promise((resolve, reject) => {
    const createdAt = new Date();
    pool.query(
      "INSERT INTO ratings (user_id, title, content, image_name, score, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, title, content, image_name, score, createdAt],
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
      `SELECT r.*, 
       COUNT(m.id) as comment_count
       FROM ratings r 
       LEFT JOIN message m ON r.id = m.ratings_id 
       GROUP BY r.id 
       ORDER BY r.created_at DESC 
       LIMIT ? OFFSET ?`,
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

function getRatingById(ratingId) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM ratings WHERE id = ?",
      [ratingId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
}

function getCommentsByRatingId(ratingId) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT c.*, u.name as user_name FROM message c JOIN users u ON c.user_id = u.id WHERE c.ratings_id = ? ORDER BY c.create_at DESC",
      [ratingId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
}

function insertComment(ratingId, userId, comment) {
  return new Promise((resolve, reject) => {
    const createdAt = new Date();
    pool.query(
      "INSERT INTO message (user_id, ratings_id, content, like_count, create_at) VALUES (?, ?, ?, 0, ?)",
      [userId, ratingId, comment, createdAt],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
}

function updateCommentLikes(commentId, newLikeCount) {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE message SET like_count = ? WHERE id = ?",
      [newLikeCount, commentId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
}

function getCommentById(commentId) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM message WHERE id = ?",
      [commentId],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
}

module.exports = {
  getAllUserAuthInfo,
  getLatestRatingId,
  insertRating,
  getRatingsWithPageScroll,
  getTotalRatingsCount,
  getRatingById,
  getCommentsByRatingId,
  insertComment,
  updateCommentLikes,
  getCommentById
};