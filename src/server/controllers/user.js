import PrismaClientKnownRequestError, { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();


const jwtSecret = 'sooper-dooper-very-nice-secret';

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({
                error: "Missing fields in request body"
            })
        }

        const saltRound = 10
        const hashedPassword = await bcrypt.hash(password, saltRound)
        const registeredUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        res.status(201).json({ user: registeredUser });
    } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
            return res.status(400).json({ error: 'Something went Wrong at User controller!' })
        } else {
            return res.status(403).json({ error: 'Something went Wrong at User controller!' })
        }
    }

};

const login = async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await prisma.user.findFirst({
        where: { username }
    })

    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    try {
        const passwordsMatch = await bcrypt.compare(password, foundUser.password)

        if (!passwordsMatch) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const token = jwt.sign({ sub: foundUser.username }, jwtSecret)

        res.status(200).json({ data: token });
    } catch (error) {
        return res.status(500).json({ error: 'An error occured duiting login!' })
    }
};

export {
    login, register
};
