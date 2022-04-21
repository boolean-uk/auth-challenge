const middleware = require('/Users/danielmccarthy/auth-challenge/src/middleware/middleware.js');
const express = require('express');
const {
    getAllMovies,
    createMovie
} = require('../controllers/movie');

const router = express.Router();


router.get('/getMovies', middleware.checkToken, getAllMovies);
router.post('/', middleware.checkToken, createMovie);

module.exports = router;