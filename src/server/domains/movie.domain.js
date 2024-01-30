import prisma from "../../../prisma/client.js";
// eslint-disable-next-line no-unused-vars
import * as Types from "../utils/types.d.js";

/**
 * @param {String} title
 * @param {String} description
 * @param {Number} runtimeMins
 * @returns {Promise<Types.Movie>}
 */
function createMovie(title, description, runtimeMins) {
  return prisma.movie.create({
    data: {
      title,
      description,
      runtimeMins,
    },
  });
}

/**
 * @returns {Promise<Types.Movie[]>}
 */
function selectAllMovies() {
  return prisma.movie.findMany();
}

export { createMovie, selectAllMovies };
