const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// const jwtSecret = "mysecret";
const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  try {
    const createdUser = await prisma.user.create({
      data: { username: username, password: hash },
    });
    res.json({ data: createdUser });
    console.log("createdUser", createdUser);
  } catch (error) {
    res.status(500).json({ error: "Cannot be registered!" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!foundUser) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const passwordsMatch = await bcrypt.compare(password, foundUser.password);
  // console.log("bcyrpt.compare: ", passwordsMatch);

  if (!passwordsMatch) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign({ username: foundUser.username }, secret);

  res.json({ data: token });
};

module.exports = {
  register,
  login,
};
