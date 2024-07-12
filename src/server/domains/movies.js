import prisma from "../../utils/prisma.js";
import { getUser } from "../domains/user.js";

async function getMoviesDb(username) {
  const user = await getUser(username);

  return await prisma.movie.findMany({
    where: {
      userId: user.id
    }
  });
}

async function createMovieDb(title, description, runtimeMins, username) {
  const user = await getUser(username);

  return await prisma.movie.create({
    data: {
      title: title,
      description: description,
      runtimeMins: Number(runtimeMins),
      userId: user.id,
    },
  });
}

export { getMoviesDb, createMovieDb };
