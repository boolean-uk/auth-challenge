const express = require('express');
const {createMovie} = require('../controllers/movie.js')

const router = express.Router();

router.post('/', createMovie)

module.exports = router;