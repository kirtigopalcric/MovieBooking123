const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');


// Route to routePath
router.get("/", rootPath);

// Find all movies by status
router.get('/movies', movieController.findAllMovies);

// Find one movie by id
router.get('/movies/:movieId', movieController.findOne);

// Find all shows of a specific movie by id
router.get('/movies/:movieId/shows', movieController.findShows);

module.exports = router;
