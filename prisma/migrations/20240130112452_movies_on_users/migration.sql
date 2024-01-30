-- CreateTable
CREATE TABLE "MoviesOnUsers" (
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "favourite" BOOLEAN NOT NULL,
    "note" TEXT,
    "personalRating" INTEGER,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoviesOnUsers_pkey" PRIMARY KEY ("userId","movieId")
);

-- AddForeignKey
ALTER TABLE "MoviesOnUsers" ADD CONSTRAINT "MoviesOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviesOnUsers" ADD CONSTRAINT "MoviesOnUsers_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
