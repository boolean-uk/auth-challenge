import { Router } from 'express';
const router = Router();
import { createMovie, getAllMovies } from "../controllers/movie.js";

//Get all movies:
router.get('/', getAllMovies);

//Add a new movie:
router.post('/', createMovie);

export default router;
