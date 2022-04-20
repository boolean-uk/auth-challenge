const express = require('express');
const { getMovies, createMovie } = require('../controllers/movie')
const { checkToken } = require('../middleware/movie')

const router = express.Router();

router.use(checkToken)

router.get('/', getMovies)
router.post('/', createMovie)

module.exports = router;