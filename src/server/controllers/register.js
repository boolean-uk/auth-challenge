const bcrypt = require('bcrypt');
const saltRounds = 10;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
    const { username, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.user.create({
        data: {
           username: username,
          password: hashedPassword
        },
      });
      res.status(201).json({ data: { id: user.id, username: user.username } });
    } catch (e) {
      if (e.code === "P2002") {
        res.status(403).json({ error: "Username Already in Use" });
      } else {
        res.status(500).json({ error: e });
      }
    }
  };

    module.exports = {
        registerUser
    }