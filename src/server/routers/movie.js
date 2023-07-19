const express = require('express');
const { 
  createMovie,
  getAllMovies
} = require('../controllers/movie')

const router = express.Router();

router.post('/', createMovie)
router.get('/', getAllMovies)

module.exports = router;