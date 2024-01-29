
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserDb, createUserDb } from "../domains/users.js";

const jwtSecret = "mysecret";

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await findUserDb(username);

    if (existingUser) {
      return res.status(401).json({ error: "Username already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await createUserDb(username, hashedPassword);

    res.status(201).json({ data: createdUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!foundUser) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const passwordsMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordsMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ userId: foundUser.id }, jwtSecret, {
      expiresIn: '1h',
    });

    res.json({ data: token });
  } catch (error) {
    console.error('An error occurred during login:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export { register, login };
