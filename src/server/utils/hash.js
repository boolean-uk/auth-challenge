import * as bcrypt from "bcrypt";

/**
 * @param {String} string
 * @returns {Promise<String>}
 */
function hashString(string) {
  return bcrypt.hash(string, 12);
}

export { hashString };
