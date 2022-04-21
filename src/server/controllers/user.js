const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'secret';

const register = async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10)
    try {
        const createdUser = await prisma.user.create({
        data: {
            username: username,
            password: hash
        }
        })
    console.log("done")
    res.json({ data: createdUser });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError){
            res.json({error: e.code})
            return
        }
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    });
    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }
    const passwordsMatch = await bcrypt.compare(password,foundUser.password)
    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }
    const token = await jwt.sign(username, jwtSecret)
    res.json({ data: token });
};

module.exports = {
    register,
    login
};