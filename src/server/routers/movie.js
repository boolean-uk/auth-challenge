const express = require("express");
const { createMovie, getAllMovies } = require("../controllers/movie.js")
const VerifyToken = require("../../utils/VerifyToken.js")

const router = express.Router();
router.post("/", VerifyToken, createMovie);
router.get("/",  getAllMovies)

module.exports = router;
