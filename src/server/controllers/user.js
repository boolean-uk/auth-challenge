const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const saltRounds = 10;
const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ error: 'Missing fields in request body' });
    }
    const hashedPw = await bcrypt.hash(password, saltRounds);
    try {
        const createdUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedPw,
            },
        });
        console.log(createdUser);
        res.status(201).json({ data: createdUser });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                res.status(401).json({
                    error: 'A username with that name already exists',
                });
            }
        }
        res.status(500).json({ error: e.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const passwordsMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign(username, jwtSecret);

    res.json({ data: token });
};

module.exports = {
    register,
    login,
};
