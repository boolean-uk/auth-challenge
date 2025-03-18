/*
  Warnings:

  - The primary key for the `UsersMovies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UsersMovies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UsersMovies" DROP CONSTRAINT "UsersMovies_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UsersMovies_pkey" PRIMARY KEY ("userID", "movieID");
