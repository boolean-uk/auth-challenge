const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";
const saltRounds = 10;

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ error: "Username and password are required." });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (existingUser) {
    return res.json({ error: "Username already exists." });
  }

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hash,
        },
      });
      res.json({ user: newUser });
    });
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

  const passwordsMatch = await bcrypt.compare(
    password,
    foundUser.password
  );

  if (!passwordsMatch) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign({ username }, jwtSecret);

  console.log("Generated Token:", token); // Add this line for debugging

  res.json({ data: token });
};

module.exports = {
  register,
  login,
};
