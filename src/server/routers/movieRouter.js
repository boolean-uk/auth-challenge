import express from "express";
import { authenticateToken } from "../meddileware/authenticateToken.js";
import {
  createMovie,
  getMovies,
  deleteMovie,
} from "../controllers/movieCon.js";

export const movieRouter = express.Router();

movieRouter
  .route("/")
  .post(authenticateToken, createMovie)
  .get(authenticateToken, getMovies);
movieRouter.route("/:id").delete(deleteMovie);
