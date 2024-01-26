import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

const jwtSecret = "mysecret";

import { createUserDB } from "../domain/user.js";
import { findUserDB } from "../domain/user.js";

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(406)
      .json({ error: "Both username and password required" });
  }

  const existingUser = await findUserDB(username);
  if (existingUser) {
    return res.status(401).json({ error: "Username already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await createUserDB(username, hashedPassword);

    res.status(201).json({ data: createdUser });
  } catch (error) {
    res.status(500).json({ error: "Internal Service Error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await findUserDB(username);

  if (!foundUser) {
    return res.status(401).json({ error: "Invalid username or password." });
  }
  try {
    const passwordsMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordsMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign({ username: foundUser.username }, jwtSecret);

    res.json({ data: { username, token } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register, login };
