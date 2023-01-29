const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";
const saltRounds = 10;

const register = async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
    try {
      const createdUser = await prisma.user.create({
        username: username,
        password: hashedPassword,
      });
      delete createdUser.password;
      res.status(201).json({ data: createdUser });
      console.log(createdUser);
    } catch (err) {
      if (err.code === "P2002") {
        res.status(403).json({ err: "Username already exists" });
      } else {
        res.status(500).json({ error: err });
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

  const passwordsMatch = bcrypt.compare(
    password,
    foundUser.password,
    (err, passwordsMatch) => {
      if (!passwordsMatch) {
        return res.status(401).json({ error: "Invalid username or password." });
      }
      const token = jwt.sign({ username: username }, jwtSecret);

      res.json({ data: token });
    }
  );
};

module.exports = {
  register,
  login,
};
