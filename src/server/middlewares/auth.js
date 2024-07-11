import jwt from "jsonwebtoken"
import { InvalidCredentialsError, NotValidTokenError } from "../errors/APIError.js"
import prisma from "../utils/prisma.js"

function isTokenValid(req, res, next) {
  try {
    const token = req.headers["authorization"].split(" ")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded

    next()
  } catch (error) {
    console.log(error)
    throw new InvalidCredentialsError("Access denied: token not valid")
  }
}

async function isAdmin(req, res, next) {
  const checkRole = await prisma.user.findUnique({
    where: {
      username: req.user.username
    }
  })

  if (checkRole.role !== "ADMIN") {
    throw new NotValidTokenError("Access denied: ADMINS only")
  }

  next()
}

export { isTokenValid, isAdmin }
