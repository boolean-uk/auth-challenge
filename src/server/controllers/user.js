import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { registerUserDB } = require('../domain/user.js')
const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;
    const hash = bcrypt.hash(password, 12)

    const createdUser = await registerUserDB(username, hash)

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

export {
    register,
    login
};
