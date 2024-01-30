import express from "express";
import { validateRequest } from "../middleware/validateRequest/index.js";
import { getAllMovies, submitMovie } from "../controllers/movie.js";
import { submitMovieSchema } from "../middleware/validateRequest/movie.validate.js";
import { validateLoginSession } from "../middleware/validateLogin/index.js";

const router = express.Router();

router.post(
  "/",
  validateLoginSession,
  validateRequest(submitMovieSchema),
  submitMovie,
);

router.get("/", getAllMovies);

export default router;
