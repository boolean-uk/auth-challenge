const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createMovie = async (req, res) => {
    const {
        title,
        description,
        runtimeMins
    } = req.body

    if (!title || !description || !runtimeMins) {
        return res.status(400).json({
            error: "Missing fields in request body"
        })
    }

    try {
      
        const createdMovie = await prisma.movie.create({
            data: {
                title,
                description,
                runtimeMins,
            },
        })

        res.status(201).json({ movie: createdMovie })
    } catch (e) {
        if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return res.status(409).json({ error: "A movie with the provided title already exists" })
            }
        }
        
        res.status(500).json({ error: e.message })
    }
}


const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany({
     
    });
  
    return res.status(200).json({ movies });
  };


module.exports = createMovie,
getAllMovies ;


