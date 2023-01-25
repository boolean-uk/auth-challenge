const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const saltRounds = 10;

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Please provide a username and password" });
  }

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hashedPw) => {
      try {
        const newUser = await prisma.user.create({
          data: {
            username,
            password: hashedPw,
          },
        });

        delete newUser.password;

        res.status(201).json({ status: "success", user: newUser });
      } catch (error) {
        if (error.code === "P2002") {
          res
            .status(403)
            .json({ error: `The username ${username} is already taken` });
        } else {
          res.status(500).json({ error });
        }
      }
    });
  });
};

module.exports = { registerUser };
