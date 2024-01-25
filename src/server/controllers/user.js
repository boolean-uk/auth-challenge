import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserDb, createUserDb } from '../domains/user.js';
const secret = process.env.JWT_SECRET

const register = async (req, res) => {
    const { username, password } = req.body;

    const isUsernameUnique = await findUserDb(username)
    if (isUsernameUnique) return res.status(409).json({ error: `Username ${username} has already been taken, please try a different username`})

    const hashedPassword = await bcrypt.hash(password, 12)
    try {
        const createdUser = await createUserDb(username, hashedPassword)
        return res.status(201).json({ 
            data: createdUser,
            message: `Thank you, ${username}, your registration is now complete.`
        })
    }
    catch (err) {
        return res.status(500).json({ error: 'Server error, please try again'})
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await findUserDb(username)
    if (!foundUser) return res.status(401).json({ error: 'Invalid username or password.' })

    const passwordsMatch = await bcrypt.compare(password, foundUser.password)
    if (!passwordsMatch) return res.status(401).json({ error: 'Invalid username or password.' })

    const token = jwt.sign({ username }, secret)
    res.json({ 
        token,
        message: `You have successfully logged in as ${username}`
    });
};

export {
    register,
    login
};
