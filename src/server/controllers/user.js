import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { createUserInDatabase, findUserInDatabase } from "../domain/user.js";
const jwtSecret = "mysecret";

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!password || !username) {
    return res.status(409).json({
      error: "Please provide both username and password",
      message: "Please provide both username and password",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await createUserInDatabase(username, hashedPassword);
    res
      .status(201)
      .json({ data: createdUser, message: "User successfully created" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "user already added to database" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await findUserInDatabase(username);

  if (!foundUser) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  const passwordsMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordsMatch) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  const token = jwt.sign({ username }, jwtSecret);
  res.status(201).json({ data: token, message: "user successfully logged in" });
};

export { register, login };
