const express = require('express');
const { addReviwe, getAllReview, searchReview } = require('../controller/reviweController.js');
const router = express.Router();

// Routes
router.get('/reviews', getAllReview);       // Get all reviews
router.post('/add-review', addReviwe);       // Add a review
router.get('/search-review', searchReview);  // Search reviews

module.exports = router;
