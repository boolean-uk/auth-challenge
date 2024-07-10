import { createMovieDb } from "../domains/movieDb"

const createMovie = async (req, res) => {
    const {
        title,
        decription,
        runTime
    } = req.body

    if(
        !title ||
        !decription ||
        !runTime
    ) {
        return res.status(400).json({
            message: "Missing Fields from movie form"
        })
    }
    if(
        title.length > 100 ||
        decription.length > 250
    ) {
        return res.status(400).json({
            message: "Title or Description too long"
        })
    }

    const newFilm = await createMovieDb()
    res.status(201).json({
        movie: newFilm
    })
}

export {
    createMovie
}