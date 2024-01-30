import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js"
import { connectMovieDb, createMovieDb, getMoviesDb } from "../domains/movie.js"
import jwt from "jsonwebtoken"

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
                const movie = await connectMovieDb(title, favourite, note, personalRating, decodedUsername)
                res.status(201).json({ movie })
                return
            }
        }
    }
}

const getMovies = async(req, res) => {
    const movies = await getMoviesDb()
    res.json({ movies })
    return
}

export { 
    createMovie, 
    getMovies
 }
