const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../utils/prisma.js')

const secret = process.env.JWT_SECRET

const registerUser = async (req, res) => {
    const { password, username } = req.body
    bcrypt.hash(password, 12, async function (err, hash) {
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hash
            },
            select: {
                username: true
            }
        })
        res.status(201).json({ user: newUser })
    })
}

const loginUser = async (req, res) => {
    const {username, password} = req.body
    const foundUser = await prisma.user.findUnique({
        where: {
            username
        }
    })
    if(foundUser){
        bcrypt.compare(password, foundUser.password, function(err, result){
            if(result){
                const token = jwt.sign({username}, secret)
                res.status(201).send({token})
            } else res.status(401).send('Invalid username or password')
        })
    } else res.status(401).send('Invalid username or password')

}

module.exports = {
    registerUser,
    loginUser
}