const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const mySecret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { username, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (findUser) {
    return res.status(409).json({
      error: "That username is already taken",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const createdUser = await prisma.user.create({
    data: {
      username,
      password: hash,
    },
  });

  delete createdUser.password;

  res.status(201).json({ data: createdUser });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!findUser) {
    return res.status(401).json({ error: "User doesn't exist." });
  }

  const passwordsMatch = await bcrypt.compare(password, findUser.password);;

  if (!passwordsMatch) {
    return res.status(404).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign({ username }, mySecret);

  res.status(201).json({ data: token, userId: findUser.id });
};

module.exports = {
  register,
  login,
};
