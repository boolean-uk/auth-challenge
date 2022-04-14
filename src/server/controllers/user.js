const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const key = '87764d1a-92dc-4ced-a758-9c898c31d525'
const saltRounds = 10;

const register = async (req, res) => {
  let { username, password } = req.body;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    password = hash
    const createdUser = await prisma.user.create({
      data: {
        username,
        password
      }
    })
    res.json({ data: createdUser });
  })
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await prisma.user.findUnique({
    where: {
      username
    }
  });

  if (!foundUser) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const passwordsMatch = await bcrypt.compare(password, foundUser.password)

  if (!passwordsMatch) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const token = jwt.sign({ userId: foundUser.id }, key);

  res.json({ data: token });
};

module.exports = {
  register,
  login
};