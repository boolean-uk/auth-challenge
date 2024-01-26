import prisma from "../prisma/client";

function deleteTables() {
  const tables = [prisma.user.deleteMany(), prisma.movie.deleteMany()];

  prisma.$transaction(tables);
}

global.beforeAll(deleteTables);
global.afterEach(deleteTables);
global.afterAll(() => prisma.$disconnect());
