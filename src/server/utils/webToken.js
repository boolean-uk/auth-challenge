import jwt from "jsonwebtoken";
import "dotenv/config";
const secret = process.env.TOKEN_SECRET;

/**
 *
 * @param {String} username
 * @returns {String}
 */
function createToken(username) {
  const payload = {
    sub: "login",
    username,
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
}

export { createToken };
