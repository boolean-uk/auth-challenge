const express = require('express');
const router = express.Router();
const controller = require('../controllers/movie');
const middleware = require('../middleware/middleware');

router.use(middleware.verifyToken);
router.get('/', controller.getAllMovies);
router.post('/', controller.addNewMovie);

module.exports = { router };
