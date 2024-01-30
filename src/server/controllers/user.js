import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = "mysecret";

const register = async (req, res) => {
  const { username, password } = req.body;

  const createdUser = null;

  res.json({ data: createdUser });
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
