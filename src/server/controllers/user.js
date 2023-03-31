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

  const doesUserExist = await prisma.user.findUnique({
    where: { username: username },
  });
  const doesPasswordMatch = await bcrypt.compare(
    password,
    doesUserExist.password
  );

  if (!doesUserExist) {
    res.status(401).json({ error: "Invalid Username." });
  } else if (!doesPasswordMatch) {
    res.status(401).json({ error: "Invalid Password." });
  } else {
    console.log(jwt.sign(doesUserExist.username, jwtSecret));
    res.json({ data: jwt.sign(doesUserExist.username, jwtSecret) });
  }
};

module.exports = {
  register,
  login,
};
