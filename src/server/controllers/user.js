import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserDb, createUserDb } from '../domains/user.js';

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;

    const isUsernameUnique = await findUserDb(username)
    if (isUsernameUnique) return res.status(409).json({ error: `Username ${username} has already been taken, please try a different username`})

    const hashedPassword = await bcrypt.hash(password, 12)
    try {
        const createdUser = await createUserDb(username, hashedPassword)
        return res.status(201).json({ data: createdUser })
    }
    catch (err) {
        return res.status(500).json({ error: 'Server error, please try again'})
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

export {
    register,
    login
};
