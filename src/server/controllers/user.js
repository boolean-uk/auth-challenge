const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const secret = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

const createUser = async(req, res) => {
    const {username, password} = req.body

    if (username && password) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {

                const user = await prisma.user.create({
                    data: {
                        username,
                        password: hash
                    }
                })

                res.status(201).json({user})
               
            })
        }) 
    }

}

const loginUser = async(req, res) => {
    const {username, password} = req.body

    if (username && password) {
        const foundUser = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (foundUser) {
            bcrypt.compare(password, foundUser.password, async function(err, passwordsMatch) {
                if (passwordsMatch) {
                    
                    const token = jwt.sign({username}, secret)
                    return res.json({token})
                }
            })
        }
    }
}


module.exports = {
    createUser,
    loginUser
}