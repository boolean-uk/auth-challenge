import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserDb, getUserByUsernameDb } from "../domains/user.js";

const jwtSecret = "mysecret";

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ error: "Missing fields in request body" });
  }

  const usernameIsDuplicate = await getUserByUsernameDb(username);

  if (usernameIsDuplicate) {
    return res
      .status(409)
      .send({ error: "A user with the provided username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await createUserDb(username, hashedPassword);

  return res.status(201).send({ data: createdUser });
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
