const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';
const saltRounds = 10;

const register = async (req, res) => {
    const { username, password } = req.body;
    
    bcrypt.hash(password, saltRounds, async (err, hash) => {
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
    });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if(foundUser) {
        bcrypt.compare(password, foundUser.password, async (err, result) => {
            if(result) {
                const token = jwt.sign({username}, jwtSecret)
                res.status(201).send({ token })
            } else {
                res.status(401).send({ error: "Invalid username or password" })
            }
        })
    } else {
        res.status(401).send({ error: "Invalid username or password"})
    }
};

module.exports = {
    register,
    login
};