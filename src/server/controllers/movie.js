const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET;

const getAllMovies = async (req, res) => {
  let payload;
  try {
    const [_, token] = req.headers.authorization.split(" ");

    payload = jwt.verify(token, jwtSecret);
  } catch (e) {
    return res.status(401).json({ error: "Invalid token provided." });
  }

  const foundUser = await prisma.user.findUnique({
    where: { username: payload.username },
  });

  if (!foundUser) {
    return res.status(401).json({ error: "Invalid username." });
  }

  const movies = await prisma.movie.findMany({
    where: { userId: foundUser.id },
  });

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;
  let payload;

  try {
    const [_, token] = req.headers.authorization.split(" ");

    payload = jwt.verify(token, jwtSecret);
  } catch (e) {
    return res.status(401).json({ error: "Invalid token provided." });
  }

  const user = await prisma.user.findFirst({
    where: { username: payload.username },
  });

  try {
    const createdMovie = await prisma.movie.create({
      data: {
        title,
        description,
        runtimeMins,
        user: { connect: { id: user.id } },
      },
      include: { user: true },
    });

    res.json({ data: createdMovie });
  } catch (e) {
    res.status(409).json({ error: "Movie title already exists." });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
};
