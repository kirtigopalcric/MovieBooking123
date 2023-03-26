const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller');

// Find all genres
router.get('/genres', genreController.findAllGenres);

module.exports = router;
