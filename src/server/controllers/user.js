const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const saltRounds = 10;

    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        return res.status(201).json({ message: 'User created successfully.', userId: newUser.id });
    } catch (error) {
        return res.status(500).json({ error: 'Error creating new user.' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password.' });
        }

        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'User logged in successfully.',
            token
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error logging in user.' });
    }
};

module.exports = {
    register,
    login
};