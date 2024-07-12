import express from 'express'
import { getAllMovies, createMovie } from '../controllers/movie.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyToken, getAllMovies)
router.post('/', verifyToken, createMovie)

export default router