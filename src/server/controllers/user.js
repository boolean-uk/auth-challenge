import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

import { register } from "../domain/user.js";

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!password || !username) {
    return res.status(409).json({ error: "Please enter username or password" });
  }

  try {
    const hash = await bcrypt.hash(password, 3);
    const createdUser = await register(username, hash);
    res.status(201).json({ user: createdUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = null;

  if (!foundUser) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const passwordsMatch = false;

  if (!passwordsMatch) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = null;

  res.json({ data: token });
};

export { register, login };
