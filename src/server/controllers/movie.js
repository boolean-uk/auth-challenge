const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const key = '87764d1a-92dc-4ced-a758-9c898c31d525'

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;
  const authorization = req.headers['authorization']
  if (!authorization) {
    res.status(401)
    res.json({ error: 'token is not valid, no header' })
    return
  }
  const parts = authorization.split(' ')
  const token = parts[1]
  try {
    const payload = jwt.verify(token, key)
    console.log('we just verified the user!!! and this is his payload', payload)
    req.userId = payload.userId
  } catch (e) {
    res.status(401)
    res.json({ error: 'Invalid token provided.' })
    return
  }

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      description,
      runtimeMins,
      userId: req.userId
    }
  })

  res.json({ data: createdMovie });
};

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({ where: { userId: parseInt(req.params.id) } });
  res.json({ data: movies });
};

module.exports = {
  getAllMovies,
  createMovie
};