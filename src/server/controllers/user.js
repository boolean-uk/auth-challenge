const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const key = '87764d1a-92dc-4ced-a758-9c898c31d525'
const saltRounds = 10;
const maxAge = 7 * 24 * 60 * 60

const register = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, saltRounds)
  const createdUser = await prisma.user.create({
    data: { username, password: hash }
  })
  res.json({ data: createdUser });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await prisma.user.findUnique({
    where: { username }
  });

  if (!foundUser) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }
  const match = await bcrypt.compare(password, foundUser.password)
  if (!match) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }
  const token = jwt.sign({ userId: foundUser.id }, key, { expiresIn: maxAge });
  res.json({ data: token, userId: foundUser.id });
};

module.exports = {
  register,
  login
};