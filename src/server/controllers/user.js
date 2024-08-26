import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const jwtSecret = 'mysecret';

export const register = async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await prisma.user.create({
        data: { username, password: hashedPassword },
    });

    res.json({ data: createdUser });
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await prisma.user.findUnique({ where: { username } });

    if (!foundUser || !await bcrypt.compare(password, foundUser.password)) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ userId: foundUser.id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
};
