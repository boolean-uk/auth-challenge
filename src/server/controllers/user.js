import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const createdUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        // Remove the password from the response
        const { password: _, ...userWithoutPassword } = createdUser;

        res.json({ data: userWithoutPassword });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const foundUser = await prisma.user.findUnique({
            where: { username },
        });

        if (!foundUser) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const passwordsMatch = await bcrypt.compare(password, foundUser.password);

        if (!passwordsMatch) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const token = jwt.sign({ username: foundUser.username }, jwtSecret, { expiresIn: '1h' });

        res.json({ data: token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

export {
    register,
    login
};
