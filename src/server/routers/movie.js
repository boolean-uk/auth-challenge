import express from 'express';
import { getAllMovies, createNewMovie } from '../controllers/movie.js';

const router = express.Router();

router.get('/', getAllMovies);
router.post('/', createNewMovie);

export default router;
