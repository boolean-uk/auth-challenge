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
                try {

                    const user = await prisma.user.create({
                        data: {
                            username,
                            password: hash
                        }
                    })
    
                    res.status(201).json({user: user.username,
                    registerStatus: 'User created!'})
                    
                    
                } catch (e) {
                    const error = "The user already exists"
                    console.log(error)
                    res.status(409).send({error})
                }
               
            })
        }) 
    }  

}

const loginUser = async(req, res) => {
    const {usernameLogin, passwordLogin} = req.body
    let error

    if (usernameLogin && passwordLogin) {
        const foundUser = await prisma.user.findUnique({
            where: {
                username: usernameLogin
            }
        })
        

        if (foundUser) {
            bcrypt.compare(passwordLogin, foundUser.password, async function(err, passwordsMatch) {
                if (passwordsMatch) {
                    
                    const token = jwt.sign({usernameLogin}, secret)
                    // console.log('Login complete')
                    return res.json({token})
                } else {
                    error = "incorrect password"
                    // console.log(error)
                    res.status(409).send({error})
                }
            })
        } else {
            error = "Username not found"
            // console.log(error)
            res.status(409).send({error})
        }
    }
}


module.exports = {
    createUser,
    loginUser
}