import { createMovieDb } from "../domains/movie.js"
import jwt from "jsonwebtoken"

const createMovie = async(req, res) => {
    const { title, description, runtimeMins } = req.body
    const token = req.headers.authorization

    if (!token) {
        res.status(401).json({error: "user not signed in"})
        return
    }

    try{
        jwt.verify(token, process.env.SECRET)
    } catch (e) {
        console.log(e)
        res.status(403).json({error: "access denied"})
        return
    }

    const movie = await createMovieDb(title, description, runtimeMins)
    res.status(201).json({ movie })
}

export { createMovie }
