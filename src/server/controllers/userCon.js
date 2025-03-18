import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserDb, findUserDb, updateUserDb } from "../queries/user.js";

export const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await createUserDb(username, hashedPassword);

    res.status(201).json({
      message:
        "Your account has been created successfully. You can log in to your account now.",
    });
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("username")) {
      return res.status(409).json({
        error: "Username already exists. Please try again with another one!",
      });
    }
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Please, enter your username and password" });
  }

  const user = await findUserDb(username);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    /* This step is optional. It updates the user table by inserting the last token given to the user the last time they logged in into the token field (optional with default value of NULL) in the user table.
  
      The benefit of that is: every time the user logs in, the token will be updated. That means that the record of that user is updated, including the updatedAt field. This way, we are able to know, for example: 
      - When the last time that user logged in was?
      - Is the user active or not? */

    await updateUserDb(user.id, token);
    // The app uses the userInfo object to welcome the user and tells them when they last logged in.
    res.json({ token, userInfo: { username, lastVisit: user.updatedAt } });
  } else {
    res
      .status(401)
      .json({ error: "Username or password is incorrect! Please try again." });
  }
};
