const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const register = async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hashed_pw) => {
    try {
      const createdUser = await prisma.user.create({
        data: {
          username: username,
          password: hashed_pw,
        },
      });
      delete createdUser.password;
      res.json({ data: createdUser });
    } catch (err) {
      if (err.code === "P2002") {
        res
          .status(403)
          .json({ err: `The username ${username} is already taken` });
      } else {
        res.status(400).json({ error: err });
      }
    }
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!foundUser) {
    return res.status(401).json({ error: "Invalid username or password." });
  }
  bcrypt.compare(password, foundUser.password, (err, passwordsMatch) => {
    if (!passwordsMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    } else {
      const secret = process.env.JWT_SECRET;
      const access_token = jwt.sign(
        { sub: foundUser.id, username: foundUser.username },
        secret
      );
      res.status(201).json({ data: access_token });
    }
  });
};

module.exports = {
  register,
  login,
};
