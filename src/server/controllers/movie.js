const { Prisma } = require("@prisma/client");
const prisma = require("../../utils/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const saltRounds = 12;

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body
  if (!title || !description || !runtimeMins) {
    return res.status(400).json({ error: "Missing fields in request body" })
  }

  try {
    const createdMovie = await prisma.movie.create({
      data: {
        title: title,
        description: description,
        runtimeMins: runtimeMins
      }
    })
    console.log("created:", createdMovie)
    res.status(201).json({ movie: createdMovie, status: "createMovie successful"})
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.json({ error: "could not create movie" });
      }
    }
    res.status(500).json({ error: e.message });
  }
}

module.exports = createMovie