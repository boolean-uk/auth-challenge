const express = require('express');
const {
    getAllMovies,
    getMovieById,
    createMovie,
} = require('../controllers/movie');

const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', createMovie);

module.exports = router;
