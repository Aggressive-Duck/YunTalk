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

module.exports = router;