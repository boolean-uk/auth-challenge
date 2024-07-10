import jwt from "jsonwebtoken"
import { NotValidTokenError } from "../errors/APIError.js"

function isTokenValid(req, res, next) {
  try {
    const token = req.headers["authorization"].split(" ")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded

    next()
  } catch (error) {
    throw new NotValidTokenError("Access denied: token not valid")
  }
}

export { isTokenValid }
