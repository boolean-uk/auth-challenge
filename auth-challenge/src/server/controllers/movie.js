import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { createMovieDb, getAllUsersMovies } from "../domains/movieDb.js"

const createMovie = async (req, res) => {
    const {
        title,
        description,
        runTime
    } = req.body
    const userID = req.user.id

    if(
        !title ||
        !description ||
        !runTime
    ) {
        return res.status(400).json({
            message: "Missing Fields from movie form"
        })
    }
    if(
        title.length > 100 ||
        description.length > 250
    ) {
        return res.status(400).json({
            message: "Title or Description too long"
        })
    }

    try {
        const newFilm = await createMovieDb(title, description, Number(runTime), userID)
        res.status(201).json({
        movie: newFilm
    })
    } catch(e) {
        console.log(e)
    }
    
}

const getAllMovies = async (req, res) => {
    const id = req.user.id
    const usersMovies = await getAllUsersMovies(id)
    res.status(201).json({
        movies: usersMovies
    })
}

export {
    createMovie,
    getAllMovies
}