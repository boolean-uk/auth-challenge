import { Router } from "express";
import { createMovie, getAllMovies } from "../controllers/movie.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router()

router.post('/', verifyToken, createMovie)
router.get('/users', verifyToken, getAllMovies)

export default router