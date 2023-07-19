const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET

const getMovies = async (req, res) => {
    const movies = await prisma.movie.findMany();
    res.json({ data: movies });
  };


const createMovie = async (req, res) => {

    // destructures the request body
    const { title, description, runtime } = req.body

    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, secret);
      } catch (e) {
        return res.status(401).json({ error: "Invalid token" });
      }
    
      // creates a new movie in the DB
      const createdMovie = await prisma.movie.create({
        data: { 
            title: title,
            description: description,
            runtime: runtime
         },
      });
      res.json({ data: createdMovie });
}


module.exports = {
    getMovies,
    createMovie,
  };