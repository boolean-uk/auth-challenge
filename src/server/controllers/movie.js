import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"
import { connectMovieDb, createMovieDb, getMoviesDb } from "../domains/movie.js"
import jwt from "jsonwebtoken"
import { findUserWithMoviesDb } from "../domains/user.js"

// refactoring needed here, most likely
// is it ever good to nest try... catch blocks?
const createMovie = async(req, res) => {
    const { title, description, runtimeMins, favourite, note, personalRating } = req.body
    const token = req.headers.authorization
    
    if (!token) {
        res.status(401).json({error: "missing authentication"})
        return
    }
    
    let decodedUsername
    try{
        decodedUsername = jwt.verify(token, process.env.SECRET)
    } catch (e) {
        res.status(403).json({error: "unauthorised"})
        return
    }
    
    try {
        const movie = await createMovieDb(title, description, Number(runtimeMins), favourite, note, personalRating, decodedUsername)
        res.status(201).json({ movie })
        return
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                try{
                    const movie = await connectMovieDb(title, favourite, note, personalRating, decodedUsername)
                    res.status(201).json({ movie })
                    return
                } catch (e) {
                    res.status(409).json({error: "this movie is already in your list"})
                }
            }
        }
    }
}

const getMovies = async(req, res) => {
    const movies = await getMoviesDb()
    res.json({ movies })
    return
}

const getMoviesByUser = async(req, res) => {
    const token = req.headers.authorization
    try {
        const username = token && jwt.verify(token, process.env.SECRET)
        const user = await findUserWithMoviesDb(username)
        const movies = user.movies
        res.json({ movies })
    } catch (e) {
        if (e.message === "jwt malformed") {
            res.status(403).json({error: "unauthorised"})
        }
    }
}

export { 
    createMovie, 
    getMovies, 
    getMoviesByUser
 }
