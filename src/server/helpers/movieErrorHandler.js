import jwt from 'jsonwebtoken'
import errorCreator from './errorCreator.js'

// DB
import { getMovieByTitleDb } from '../domains/movie.js'

const secret = process.env.JWT_SECRET

const checkToken = (token) => {
  if (!token) {
    throw errorCreator('Missing token', 400)
  }

  const checkedToken = jwt.verify(token.split(' ')[1], secret)

  return checkedToken
}

const checkFields = (fields) => {
  fields.forEach((field) => {
    if (!field) {
      throw errorCreator('Missing fields', 400)
    }
  })
}

const checkTitleExist = async (title) => {
  const foundMovie = await getMovieByTitleDb(title)

  if (foundMovie) {
    throw errorCreator('The movie with provided title is already exist', 409)
  }

  return foundMovie
}

export { checkToken, checkFields, checkTitleExist }
