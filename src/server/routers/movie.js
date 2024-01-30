import express from "express";
import {
  getAllMovies,
  createMovie,
  deleteMovie,
} from "../controllers/movie.js";

const router = express.Router();

router.get("/", getAllMovies);
router.post("/", createMovie);
router.delete("/:id", deleteMovie);

export default router;
