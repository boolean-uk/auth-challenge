import prisma from "../prisma/client";

function deleteTables() {
  const tables = [prisma.user.deleteMany(), prisma.movie.deleteMany()];

  return prisma.$transaction(tables);
}

global.beforeAll(() => deleteTables());
global.afterEach(() => deleteTables());
global.afterAll(() => prisma.$disconnect());
