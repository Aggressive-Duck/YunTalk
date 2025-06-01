const express = require('express');
const multer = require('multer');
const path = require('path');
const ratingController = require('../controllers/ratingController');

const router = express.Router();

// Set up multer to save files to /public/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads/ratingImg'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
});
const upload = multer({ storage: storage });

// Use the controller for the POST route
router.post('/', upload.single('image'), ratingController.createRating);
// Add GET route for fetching ratings
router.get('/', ratingController.getRatings);

// Add GET route for fetching single rating with comments
router.get('/:id', ratingController.getRatingById);
// Add POST route for adding comments
router.post('/:id/comment', ratingController.addComment);
// Add PUT route for liking comments (put this BEFORE the /:id route)
router.put('/comment/:commentId/like', ratingController.likeComment);

module.exports = router;