import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    console.log('registering user')
    const { username, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    });

    const token = jwt.sign(newUser, jwtSecret);

    res.json({ data: newUser, token });
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

export {
    register,
    login
};
