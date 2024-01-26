import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserDb, createUserDb } from "../domains/users.js";

const jwtSecret = "mysecret";

const register = async (req, res) => {
  const { username, password } = req.body;
  try {    
    const foundUser = await findUserDb(username);
    if (foundUser) {
      return res.status(401).json({ error: "Username already taken." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await createUserDb(username, hashedPassword);
    res.status(201).json({ data: createdUser });
  } catch (error) {
    res.status(500).json({ error : "Internal server error" });
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
