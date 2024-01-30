import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUser, registerNewUserdb } from "../domains/user.js";

const jwtSecret = "mysecret";

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Enter a valid username and password" });

  try {
    const hash = await bcrypt.hash(password, 12);

    const createdUser = await registerNewUserdb(username, hash);
    return res
      .status(201)
      .json({ data: createdUser, message: "Created user successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await findUser(username);

  if (!foundUser) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const passwordsMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordsMatch) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign(username, jwtSecret);

  res.json({ data: token, message: "User logged in sucess" });
};

export { register, login };
