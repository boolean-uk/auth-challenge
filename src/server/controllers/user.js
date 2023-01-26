const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;
    const saltRound = 10

    bcrypt.genSalt(saltRound, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hashedPw) => {

            const newUser = await prisma.user.create({
                data: {
                    username,
                    password: hashedPw
                }
            })

            delete newUser.password;
            res.status(201).json({ user: newUser })
        })

    })
    const createdUser = null;

    res.json({ data: createdUser });
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