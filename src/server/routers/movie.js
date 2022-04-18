const express = require('express');
const {
    getAllMovies,
    createMovie
} = require('../controllers/movie');
const { verifyToken } = require('../middleware/middleware')
const router = express.Router();
router.get('/', getAllMovies);

router.use(verifyToken)// middlesware function to check for valid token from localstorage
router.post('/', createMovie);

module.exports = router;