import express from "express";
import validateRequest from "../middleware/validateRequest";
import { submitMovie } from "../controllers/movie";
import { submitMovieSchema } from "../middleware/validateRequest/movie.validate";
import { validateLoginSession } from "../middleware/validateLogin";

const router = express.Router();

router.post(
  "/",
  validateLoginSession,
  validateRequest(submitMovieSchema),
  submitMovie,
);

export default router;
