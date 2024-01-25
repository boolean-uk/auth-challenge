import { Prisma } from "@prisma/client"

const getUserByName = async (username) => {
  try {
    const user = await Prisma.user.findUnique({
      where: {
        username
      }
    })
    return { user }
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (username, password) => {
  
}

export const handleRegister = (username, password) => {
  try {
    const user = getUserByName(username)
    if (user) {
      return JSON.stringify({ error: 'username is already taken' })
    } else {

    }
  } catch (error) {
    console.log(error)
  }
}