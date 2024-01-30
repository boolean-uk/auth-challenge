// eslint-disable-next-line no-unused-vars
import * as Types from "../utils/types.d.js";
import * as bcrypt from "bcrypt";
import { createUser, selectUserByUsername } from "../domains/user.domain.js";
import { handleError } from "../utils/error.js";
import { MismatchLoginError } from "../utils/errorClasses.js";
import { createToken } from "../utils/webToken.js";

/**
 * @param {Types.ExRequest} req
 * @param {Types.ExResponse} res
 * @returns {Promise<void>}
 */
async function registerUser(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await createUser(username, hashedPassword);
    const payload = {
      user: {
        id: newUser.id,
        username: newUser.username,
      },
    };
    res.status(201).json(payload);
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * @param {Types.ExRequest} req
 * @param {Types.ExResponse} res
 * @returns {Promise<void>}
 */
async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const foundUser = await selectUserByUsername(username);
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword) {
      throw new MismatchLoginError("Username and login do not match");
    }
    const token = createToken(username);
    res.status(201).json({ token });
  } catch (error) {
    handleError(error, res);
  }
}

export { loginUser, registerUser };
