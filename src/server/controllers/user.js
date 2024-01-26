import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import  userDatabase  from '../../domain/UserDb.js';

const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12)

    const createdUser = await userDatabase(username, hashedPassword);

    delete createdUser.password
    res.json({ data: createdUser});

    

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
