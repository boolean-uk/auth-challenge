const express = require("express");
const { createMovie, getAllMovies } = require("../controllers/movie");
const router = express.Router();

router.route("/").get(getAllMovies).post(createMovie);

module.exports = router;
