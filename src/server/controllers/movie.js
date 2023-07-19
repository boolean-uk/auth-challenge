const { Prisma } = require("@prisma/client");
const prisma = require("../../utils/prisma");

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;
  if (!title || !description || !runtimeMins) {
    return res.status(400).json({ error: "Missing fields in request body" })
  }

  try {
    const runtimeMinsNum = Number(runtimeMins)
    const movie = await prisma.movie.create({
      data: {
        title: title,
        description: description,
        runtimeMins: runtimeMinsNum,
      },
    });
    console.log("created:", movie);
    res
      .status(201)
      .json({ movie: movie, status: "createMovie successful" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.json({ error: "could not create movie" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

const getAllMovies = async (req, res) => {
    const movies = await prisma.movie.findMany()
    res.json({ data: movies })
    console.log('movies:', movies)
}

module.exports = {createMovie, getAllMovies};
