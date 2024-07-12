/* eslint-disable no-unused-vars */
import { registerUserDb, getUser, getAllUsersDb } from "../domains/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function registerUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await registerUserDb(username, password);
    res.status(200).json({ user });
  } catch (e) {
    if (e.code === "P2002") {
      res.status(400).json({ error: "A user with that name already exists" });
    }
  }
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
        return res.status(200).json({ token, username });
      }
      throw Error;
    } catch (e) {
      res.status(403).json({ error: "Incorrect password" });
    }
  } catch (e) {
    if (e.code === "P2025") {
      res.status(404).json({ error: "No user found with that username" });
    }
  }
}

async function getUserProfile(req, res) {
  const [_, token] = req.headers.authorization.split(" ");
  if (token) {
    const decoded = jwt.decode(token);
    const user = await getUser(decoded.username);
    const propsToDelete = ["passwordHash", "updatedAt", "createdAt", "id"];

    propsToDelete.forEach((prop) => {
      delete user[prop];
    });
    res.status(200).json({ user });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await getAllUsersDb();
    res.status(200).json({ users });
  } catch (e) {
    res.status(400).json({error: "Something went wrong trying to fetch users"})
  }
}

export { registerUser, loginUser, getUserProfile, getAllUsers };
