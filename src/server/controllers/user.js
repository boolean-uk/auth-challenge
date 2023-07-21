const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";
const saltRounds = 10;

const register = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const user = await prisma.user.create({
          data: {
            username,
            password: hash,
          },
        });
        res.json({ user });
      });
    });
  } else {
    return res.json({ error });
  }
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
    async function (error, result) {
      result ? true : false;
    }
  );

  if (!passwordsMatch) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign({username}, jwtSecret);

  res.json({ data: token });
};

module.exports = {
  register,
  login,
};
