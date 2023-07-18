const express = require("express");
const createMovie = require("../controllers/movie.js")
const VerifyToken = require("../../utils/VerifyToken.js")

const router = express.Router();
router.post("/", VerifyToken, createMovie);

module.exports = router;
