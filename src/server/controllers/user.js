const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const saltRounds = 10;

const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") return;
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    try {
      const createdUser = await prisma.user.create({
        data: {
          username: username,
          password: hash,
        },
      });
      return res.status(201).json({ createdUser });
    } catch (error) {
      console.log("error is", error);
      if (error.code === "P2002") {
        res
          .status(403)
          .json({ error: `The username ${username} is already taken!` });
      } else {
        res.status(500).json({ error: "server error" });
      }
    }
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(401).json({
      error: "Invalid username or password",
    });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }
    const accessToken = jwt.sign(
      {
        username: user.username,
      },
      secret
    );
    res.status(201).json({ accessToken });
  });
};

module.exports = {
  register,
  login,
};
