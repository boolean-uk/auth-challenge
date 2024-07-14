import express from "express"
import { createMovie, getAllMovies, getUserMovies } from "../controllers/movie.js"
import { verifyToken } from "../middleware/auth.js"

const movRouter = express.Router()

movRouter.get('/', getAllMovies)

movRouter.get('/:username', verifyToken, getUserMovies)

movRouter.post('/', verifyToken, createMovie)


export default movRouter

