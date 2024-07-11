import prisma from "../../utils/prisma.js";
import { getUser } from "../domains/user.js";

async function getMoviesDb() {
  return await prisma.movie.findMany();
}

async function createMovieDb(title, description, runtimeMins, username) {
  const user = await getUser(username);

  return await prisma.movie.create({
    data: {
      title: title,
      description: description,
      runtimeMins: runtimeMins,
      userId: user.id,
    },
  });
}

export { getMoviesDb, createMovieDb };
