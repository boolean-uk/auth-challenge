const prisma = require('../utils/prisma')
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) return res.status(403).send({message: 'Please enter a valid username and password'})

  const token = jwt.sign({username, password}, process.env.JWT_SECRET)
  
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: token
      }
    })
    return res.status(201).send({user, message: 'Registration successful'})

  } catch (error) {
    return res.status(403).send({message: 'Error, username is taken'})

  }
}

const login = (req, res) => {

}

module.exports = { register, login }
