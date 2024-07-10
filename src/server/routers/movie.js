import express from 'express'
import { getAllMovies, createMovie } from '../controllers/movie.js'

const router = express.Router()

router.get('/', getAllMovies)
router.post('/', createMovie)

export default router