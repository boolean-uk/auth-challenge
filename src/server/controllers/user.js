const { Prisma } = require("@prisma/client");
const prisma = require("../../utils/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const saltRounds = 12;

const createToken = (payload, secret) => {
  const token = jwt.sign(payload, secret);
  return token;
}

const register = async (req, res) => {
  const { username, password } = req.body;
  // if (!username || !password) {
  //   return res.status(400).json({ error: "Missing fields in request body" });
  // }
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    const payload = { username, password }
    const token = createToken(payload, secret)
    console.log("registered:", user);
    res.status(201).json({ user: user, token: token, status: "registration successful" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(409)
          .json({ error: "A customer with the provided email already exists" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  // if (!username || !password) {
  //   return res.status(400).json({ error: "Missing fields in request body" });
  // }
  try {
    const foundUser = await prisma.user.findUnique({
      where: { username: username },
      select: { password: true },
    });
    function checkUser(result) {
      if (result) {
        const payload = { username, password };
        const token = createToken(payload, secret);
        console.log("login successful");
        return res.send({
          data: { token: token, username: username },
          status: "login successful",
        });
      } else {
        console.log("invalid user credentials");
        return res.status(401).send({ error: "invalid username or password" });
      }
    }
    if (foundUser) {
      bcrypt.compare(password, foundUser.password, function (err, result) {
        checkUser(result);
      });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.json({ error: "no user found" });
      }
    }
    res.status(500).json({ error: e.message });
  }
};

module.exports = { register, login };
