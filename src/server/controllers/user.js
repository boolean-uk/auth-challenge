const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const register = async (req, res) => {
  const { username, password } = req.body;

  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { username: username, password: hash },
    });
    res.status(201).json({ data: { id: user.id, username: user.username } });
  } catch (e) {
    if (e.code === "P2002") {
      res.status(403).json({ error: "Username is taken" });
    } else {
      res.status(500).json({ error: e });
    }
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await prisma.user.findUnique({
    where: { username },
  });

  if (!foundUser) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const passwordsMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordsMatch) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign({ username: foundUser.username }, jwtSecret);
  console.log(token);
  res.status(200).json({ data: token });
};

module.exports = {
  register,
  login,
};
