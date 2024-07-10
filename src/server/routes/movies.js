import express from 'express'
const moviesRouter = express.Router()
import { getMovies } from '../controllers/movies.js'

moviesRouter.get("/", getMovies)


export default moviesRouter