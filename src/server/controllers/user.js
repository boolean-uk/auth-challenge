const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
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


module.exports = {
    createUser
}