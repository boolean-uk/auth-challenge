const express = require('express');
const getMovies = require('../controllers/movie')
console.log(getMovies)

const router = express.Router();

router.get('/', getMovies)

module.exports = router;
