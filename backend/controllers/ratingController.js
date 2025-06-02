const path = require('path');
const db = require("../db/queries");

// The controller receives req, res, and assumes multer has already handled the file
exports.createRating = async (req, res) => {
  const { user_id, title, content, score = 0 } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }  

  const imgId = await db.getLatestRatingId();
  // rename files
  const fs = require('fs');
  const path = require('path');
  const oldPath = req.file.path;
  const ext = path.extname(req.file.originalname);
  const newFilename = `${imgId[0].id + 1}${ext}`;
  const newPath = path.join(req.file.destination, newFilename);
  fs.renameSync(oldPath, newPath);

  await db.insertRating(user_id, title, content, newFilename, score);
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

exports.getRatingById = async (req, res) => {
  try {
    const ratingId = req.params.id;
    const rating = await db.getRatingById(ratingId);
    const comments = await db.getCommentsByRatingId(ratingId);
    
    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }
    
    res.json({
      rating,
      comments
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rating details' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const ratingId = req.params.id;
    const { user_id, comment } = req.body;
    
    await db.insertComment(ratingId, user_id, comment);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    
    // Get current comment data
    const comment = await db.getCommentById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    // Increment like count
    const newLikeCount = comment.like_count + 1;
    await db.updateCommentLikes(commentId, newLikeCount);
    
    res.json({ success: true, newLikeCount });
  } catch (error) {
    res.status(500).json({ error: 'Failed to like comment' });
  }
};

// ...existing code...

exports.updateRatingScore = async (req, res) => {
  try {
    const ratingId = req.params.id;
    const { score } = req.body;
    
    // Validate score (1-5)
    if (!score || score < 1 || score > 5) {
      return res.status(400).json({ error: 'Score must be between 1 and 5' });
    }
    
    await db.updateRatingScore(ratingId, score);
    res.json({ success: true, score });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update rating score' });
  }
};