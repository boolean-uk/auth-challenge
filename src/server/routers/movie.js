import express from 'express'
const router = express.Router()

// Controllers
import { createMovie } from '../controllers/movie.js'

router.post('/', createMovie)

export default router
