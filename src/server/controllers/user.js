const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
  const { username, password } = req.body;
  // hash the password before sending to the database.
  const hashed_password = await bcrypt.hash(password, 12);
  try {
    const createdUser = await prisma.user.create({
      data: {
        username,
        password: hashed_password,
      },
    });
    // delete password so it's not contained in the response to client.
    delete createdUser.password;

    // id and username are sent back to the user as a confirmation of success.
    res.status(201).json({ data: createdUser });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error creating user: " + error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!foundUser) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const passwordsMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordsMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign(foundUser.username, jwtSecret);
    res.json({ token });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error loging in user: " + error.message });
  }
};

module.exports = {
    register,
    login
};