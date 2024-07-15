import express from 'express'
const moviesRouter = express.Router()
import { getMovies, createMovie, deleteMovie } from '../controllers/movies.js'
import { verifyLogin } from '../middleware/middleware.js'

moviesRouter.get("/", verifyLogin, getMovies)
moviesRouter.post("/", verifyLogin, createMovie)
moviesRouter.delete("/:id", verifyLogin, deleteMovie)


export default moviesRouter