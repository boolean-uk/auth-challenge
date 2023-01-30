const express = require('express');
const { getAllUserMovies, createMovie } = require('../controllers/movie');

const router = express.Router();

router.get('/:id', getAllUserMovies);
router.post('/', createMovie);

module.exports = router;
