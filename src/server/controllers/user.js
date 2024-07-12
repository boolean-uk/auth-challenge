import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = "mysecret";

import { create, find } from "../domains/user.js";

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!password || !username) {
    return res.status(409).json({ error: "Please enter username or password" });
  }

  try {
    const hash = await bcrypt.hash(password, 3);
    const createdUser = await create(username, hash);
    res.status(201).json({ user: createdUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!password || !username) {
    return res.status(409).json({ error: "username and password required" });
  }

  const foundUser = find(username);

  if (!foundUser) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const passwordsMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordsMatch) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign(username, jwtSecret);

  res.json({ data: token });
};

export { register, login };
