import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import errors from "../errors/errors.js";
import { createUserDb, getUserByUsernameDb } from "../domains/user.js";

const jwtSecret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ error: errors.message01 });
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

  if (!username || !password) {
    return res.status(400).send({ error: errors.message01 });
  }

  const foundUser = await getUserByUsernameDb(username);

  if (!foundUser) {
    return res
      .status(404)
      .send({ error: "No user found with the provided username" });
  }

  const passwordsMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordsMatch) {
    return res.status(409).send({ error: "Password is incorrect" });
  }

  const token = jwt.sign({ username: foundUser.username }, jwtSecret);

  return res.status(201).send({ data: token });
};

export { register, login };
