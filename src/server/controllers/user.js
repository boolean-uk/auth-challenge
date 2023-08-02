const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const secret = "isthisreallymysecret"

const createToken = async (payload) => {
    const tSecret = secret
    const token = jwt.sign(payload, tSecret)
    return token
} 

const verfiyToken = async(token) => {
    try{
        const payload = jwt.verify(token, secret)
        return payload
    } catch(err) {
        return false
    }
}

const registerUser = async (req, res) => {
    const {username, password} = req.body;
    const user = {
        username: username,
        password: password,
    }



    bcrypt.hash(password, 10, async function(err, hash) {
        const newUser = await prisma.user.create({
            data:{
                username: username,
                password: hash,

            },
            select: {
                username: true
            }

        })

        res.status(201).json({ user: newUser })

    })

}

const loginUser = async (req, res) => {
    const {username, password} = req.body;

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if(user){
        bcrypt.compare(password, user.password, function(err, result){
            if(result){
                const token =jwt.sign({username}, secret)
                res.send({token})
            } else res.status(401).send('Invalid username or password')
        })
    } else res.status(401).send('Invalid username or password')


}

module.exports = {registerUser, loginUser, secret}