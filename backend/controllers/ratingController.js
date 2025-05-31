const path = require('path');
const db = require("../db/queries");
const fs = require('fs');
const pool = require('../db/pool');

exports.createRating = async (req, res) => {
  const { user_id, title, content } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imgId = await db.getLatestRatingId();
  const oldPath = req.file.path;
  const ext = path.extname(req.file.originalname);
  const newFilename = `${imgId[0].id + 1}${ext}`;
  const newPath = path.join(req.file.destination, newFilename);
  fs.renameSync(oldPath, newPath);

  await db.insertRating(user_id, title, content, newFilename);

  const imageUrl = `/uploads/ratingImg/${newFilename}`;
  res.json({ title, content, imageUrl });
};

exports.getRatings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = 4;
    const offset = page * limit;

    const ratings = await db.getRatingsWithPageScroll(offset, limit);
    const total = await db.getTotalRatingsCount();

    res.json({
      ratings,
      hasMore: offset + limit < total,
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
};

exports.getRatingById = async (req, res) => {
  const { id } = req.params;
  try {
    pool.query(
      "SELECT * FROM ratings WHERE id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.error('DB 錯誤:', err);
          return res.status(500).json({ error: '伺服器錯誤' });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: '找不到貼文' });
        }
        res.json(results[0]);
      }
    );
  } catch (error) {
    console.error('API 錯誤:', error);
    res.status(500).json({ error: '伺服器錯誤' });
  }
};

module.exports = {
  createRating: exports.createRating,
  getRatings: exports.getRatings,
  getRatingById: exports.getRatingById
};

