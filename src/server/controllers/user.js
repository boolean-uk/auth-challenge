const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

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

    const foundUser = null;

    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const passwordsMatch = false;

    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = null;

    res.json({ data: token });
};

module.exports = {
    register,
    login
};