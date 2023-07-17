const bcrypt = require('bcrypt');
const saltRounds = 10;
// const jwt = require('jsonwebtoken');
const prisma = require('../../../utils/prisma.js')

const registerUser = async (req, res) => {
    const { username, password } = req.body
    console.log({ username, password })

    bcrypt.hash(password, saltRounds, function(err, hash) {
        prisma.user.create({
          data: {
            username,
            password: hash
          }
        })
        .then((user) => {
          return res.status(201).json({ user: { user: user.username, id: user.id } })
        })
      });
    };


    module.exports = {
        registerUser
    }
    