const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    try {
        const createdUser = await prisma.user.create({
            data: {
                username: username,
                password: hash
            }
        });
        res.status(201).json({data: createdUser});
    } catch(e) {
        console.log(e)
        res.status(400).json({error: e.message})
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

    const token = jwt.sign({username: username, password: password}, jwtSecret)

    res.json({ data: token });
};

module.exports = {
    register,
    login
};