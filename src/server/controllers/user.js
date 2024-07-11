import { registerUserDb, getUser } from "../domains/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function registerUser(req, res) {
  const { username, password } = req.body;
  const user = await registerUserDb(username, password);
  res.status(200).json({ user });
}

async function loginUser(req, res) {
  const { username, password } = req.body;


  try {
    const foundUser = await getUser(username);

    try {
      const passwordMatch = await bcrypt.compare(
        password,
        foundUser.passwordHash
      );
      if (passwordMatch) {
        const token = jwt.sign({ username: username }, process.env.JWT_SECRET);
        return res.status(200).json({ token });
      } 
      throw Error
    } catch (e) {
      res.status(403).json({ error: "Incorrect password" });
    }
  } catch (e) {
    if (e.code === "P2025") {
      res.status(404).json({ error: "No user found with that username" });
    }
  }
}

export { registerUser, loginUser };
