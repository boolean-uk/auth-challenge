const prisma = require('../utils/prisma')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret = process.env.JWT_SECRET

const register = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) return res.status(403).send({message: 'Please enter a valid username and password'})

  bcrypt.hash(password, saltRounds, async function(err, hash) {
    try {
      const user = await prisma.user.create({
        data: {
          username,
          password: hash
        }
      })
      .then((user) => {
          const token = jwt.sign(username, process.env.JWT_SECRET)
          return res.status(201).json({ user: { username: user.username, id: user.id }, message: "new user created", token })
        })

    } catch (error) {
      return res.status(403).send({message: 'Error, username is taken'})

    }
  })
}

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) return res.status(403).send({message: 'Please enter a valid username and password'})

  const foundUser = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (foundUser) {
    bcrypt.compare(password, foundUser.password, function(err, result) {
      console.log({ result })
      if (result) {
      const token = jwt.sign({username: username}, secret)

      return res.status(201).send({user: { username: foundUser.username, id: foundUser.id, token }, message: 'login is correct'})
      }

    })
  } else {
    return res.status(401).send({ message: "incorrect username or password" })
  }
}

module.exports = { register, login }
