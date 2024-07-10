import { Router } from "express"
import { isTokenValid } from "../middlewares/auth.js"
import { createMovie, getAllMovies } from "../controllers/movie.js"

const route = Router()

route.get("/", getAllMovies)
route.post("/", isTokenValid, createMovie)

export default route
