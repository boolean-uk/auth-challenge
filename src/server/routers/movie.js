const express = require('express');
const {
    getAllMovies,
    createMovie
} = require('../controllers/movie');
const { verifyToken } = require('../middleware/middleware')
const router = express.Router();


router.use(verifyToken)// middleware function to check for valid token from localstorage.
router.get('/', getAllMovies);
router.post('/', createMovie);

module.exports = router;