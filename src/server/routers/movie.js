import express from 'express';
import { getAllMovies, createMovie, deleteAllMovies } from '../controllers/movie.js';

const router = express.Router();

router.get('/', getAllMovies);
router.post('/', createMovie);
router.delete('/', deleteAllMovies)

export default router;
