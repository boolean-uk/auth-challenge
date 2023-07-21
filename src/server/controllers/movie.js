const prisma = require("@prisma/client");
const { PrismaClient } = require("@prisma/client");


const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;

  if (!title || !description || !runtimeMins) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }
console.log('Movie Summary:', title, description, runtimeMins)

  try {
    const createdMovie = await prisma.movie.create({
      data: {
       title: title ,
        description: description,
        runtimeMins: runtimeMins,
      },
    });
console.log(createdMovie)
    res.status(201).json({ createdMovie: createdMovie, status: "successful" });
  } catch (e) {
    if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.json({error: "Could not create movie"})
      }
    }

    res.status(500).json({ error: e.message });
  }
};

// const getAllMovies = async (req, res) => {
//   const movies = await prisma.movie.findMany({});

//   return res.status(200).json({ movies });
// };

module.exports = { createMovie };
