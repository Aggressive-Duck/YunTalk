const path = require('path');
const db = require("../db/queries");

// The controller receives req, res, and assumes multer has already handled the file
exports.createRating = async (req, res) => {
  
  const { user_id,title, content } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // You can save title/content to DB here if needed
  await db.insertRating({  user_id,title, content });

  const imgId = await db.getLatestRatingId();
  // raname files
  const fs = require('fs');
  const path = require('path');
  const oldPath = req.file.path;
  const ext = path.extname(req.file.originalname);
  const newFilename = `${imgId[0].id}${ext}`;
  const newPath = path.join(req.file.destination, newFilename);
  fs.renameSync(oldPath, newPath);
  //respond
  const imageUrl = `/uploads/ratingImg/${newFilename}`;
  res.json({ title, content, imageUrl });
};