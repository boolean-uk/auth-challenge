
const express = require("express");
const { createMovie, getAllMovies } = require("../controllers/movie.js")


const router = express.Router();

router.post("/", createMovie);
router.get("/", getAllMovies)

module.exports = router;
