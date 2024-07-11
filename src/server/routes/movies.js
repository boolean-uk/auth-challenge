import express from 'express'
const moviesRouter = express.Router()
import { getMovies, createMovie } from '../controllers/movies.js'
import { verifyLogin } from '../middleware/middleware.js'

moviesRouter.get("/", getMovies)
moviesRouter.post("/", verifyLogin, createMovie)


export default moviesRouter