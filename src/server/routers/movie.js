const express = require('express');
const router = express.Router();
const {
    createMovie, getMovies
} = require('../controllers/movie');

router.post('/movies', createMovie)
router.get('/movies', getMovies)

module.exports = router;