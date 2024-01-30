import prisma from "../../../prisma/client.js";
// eslint-disable-next-line no-unused-vars
import * as Types from "../utils/types.d.js";

/**
 *
 * @param {String} username
 * @param {String} password
 * @returns {Promise<Types.User>}
 */
function createUser(username, password) {
  return prisma.user.create({
    data: {
      username,
      password,
    },
  });
}

/**
 * @param {String} username
 * @returns {Promise<Types.User>}
 */
function selectUserByUsername(username) {
  return prisma.user.findUniqueOrThrow({
    where: {
      username,
    },
  });
}

export { createUser, selectUserByUsername };
