/** @format */

const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const jwtSecret = "mysecret"

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany()

  res.json({ data: movies })
}

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body
  const authorization = req.headers["authorization"]
  const parts = authorization.split(" ")
  const token = parts[1]
  let userId
  //   const [userId, setUserId] = useState('')
  //   title       String   @unique
  //   description String
  //   runtimeMins Int
  //   userId      Int      @unique

  try {
    const tokenV = jwt.verify(token, jwtSecret)
    console.log("Valid token:", tokenV)
    console.log("body:", req.body)
    userId = tokenV.userId
  } catch (e) {
    return res.status(401).json({ error: "Invalid token provided." })
  }

  const createdMovie = await prisma.movie.create({
    data: {
      title: title,
      description: description,
      runtimeMins: runtimeMins,
      userId: userId
    },
  })

  res.json({ data: createdMovie })
}

module.exports = {
  getAllMovies,
  createMovie,
}
