const express = require('express');
const { getMovies, addMovie } = require('../controllers/movie')
console.log(getMovies)

const router = express.Router();

router.get('/', getMovies)
router.post('/', addMovie)

module.exports = router;
