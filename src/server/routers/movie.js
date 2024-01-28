import express from 'express'
const router = express.Router()

// Controllers
import { createMovie, getMovies } from '../controllers/movie.js'

router.post('/', createMovie)

router.get('/', getMovies)

export default router
