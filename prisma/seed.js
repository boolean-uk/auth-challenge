import bcrypt from "bcrypt"
import prisma from "../src/utils/prisma.js"

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "Lodi",
      password: await bcrypt.hash("123", 8),
      movie: {
        create: {
          title: "The incredible movie",
          description: "You gotta see it, its incredible",
          runtime: 90,
        },
      },
    },
    include: {
      movie: true,
    },
  })

  console.log("User created", user)

  return user
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
