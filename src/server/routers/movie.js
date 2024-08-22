import { Router } from 'express';
const router = Router();
import { createMovie } from "../controllers/movie.js";

//Get all movies:
router.get('/');

//Add a new movie:
router.post('/', createMovie);

export default router;
