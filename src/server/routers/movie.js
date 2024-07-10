import express from "express"
import { createMovie, getAllMovies } from "../controllers/movie.js"
import { verifyToken } from "../middleware/auth.js"

const movRouter = express.Router()

movRouter.get('/', getAllMovies)

movRouter.post('/', verifyToken, createMovie)

export default movRouter

