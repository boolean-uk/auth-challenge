import { prisma } from "../utils/prisma.js";

const createMovieDb = async (title, description, runtimeMins, favourite = false, note, personalRating, username) =>
  await prisma.movie.create({
    data: { 
      title, 
      description, 
      runtimeMins,
      users: {
        create: {
          favourite,
          note,
          personalRating,
          assignedAt: new Date(),
          user: {
            connect:{
              username
            }
          }
        }
      }
    },
    include: {
      users: {
        include: {
          user: {
            select: {
              username: true
            }
          }
        }
      }
    }
  });

const connectMovieDb = async (title, favourite = false, note, personalRating, username) =>
  await prisma.movie.update({
    where: { 
      title
    }, 
    data: {
      users: {
      create: {
        favourite,
        note,
        personalRating,
        assignedAt: new Date(),
          user: {
            connect:{
              username
            }
          }
        }
      }
    },
    include: {
      users: {
        include: {
          user: {
            select: {
              username: true
            }
          }
        }
      }
    }
  });

const getMoviesDb = async() => 
  await prisma.movie.findMany()

export { 
  createMovieDb, 
  getMoviesDb, 
  connectMovieDb
 };
