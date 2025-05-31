const path = require('path');
const db = require("../db/queries");

// The controller receives req, res, and assumes multer has already handled the file
exports.createRating = async (req, res) => {
  
  const { user_id, title, content } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }  

  const imgId = await db.getLatestRatingId();
  // raname files
  const fs = require('fs');
  const path = require('path');
  const oldPath = req.file.path;
  const ext = path.extname(req.file.originalname);
  const newFilename = `${imgId[0].id + 1}${ext}`;
  const newPath = path.join(req.file.destination, newFilename);
  fs.renameSync(oldPath, newPath);

  await db.insertRating(user_id, title, content, newFilename);
  //respond
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
  } catch (error){
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
 };

const pool = require('../db/pool');

exports.getRatingById = (req, res) => {
  const id = req.params.id;
  console.log('[✅ 後端] 收到 fetchRatingById 請求，ID =', id);
  pool.query('SELECT * FROM ratings WHERE id = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(404).json({ message: '找不到貼文' });
    res.json(rows[0]);
  });
};
