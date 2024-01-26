// eslint-disable-next-line no-unused-vars
import * as Types from "../utils/types.d.js";
import * as bcrypt from "bcrypt";
import { createUser } from "../domains/user.domain.js";
import { handleError } from "../utils/error.js";

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

export { registerUser };
