import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createMovieInDatabase = async (title, description, runtimeMins) => {
  try {
    const newMovie = await prisma.movie.create({
      data: {
        title,
        description,
        runtimeMins,
      },
    });
    return newMovie;
  } catch (error) {
    console.error("Error creating a new movie in the database:", error);
    throw error; // Re-throw the error for further handling, if necessary
  }
};

const getMoviesFromDatabase = async () => {
  try {
    const movies = await prisma.movie.findMany();
    return movies;
  } catch (error) {
    console.error("Error fetching movies from the database:", error);
    throw error;
  }
};

export { createMovieInDatabase, getMoviesFromDatabase };
