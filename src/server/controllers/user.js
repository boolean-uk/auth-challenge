const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    const foundUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    if (foundUser) {
        return res.status(200).json({ error: 'username already taken' })
    }

    const createdUser = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword
        }
    })

    res.json({ created: createdUser });
};

const login = async (req, res) => {

    const { username, password } = req.body;
    const foundUser = await prisma.user.findUnique({
        where: { username: username }
    })
    const userMovies = await prisma.movie.findMany({
        where: {
            userId: foundUser.id
        }
    })
    
    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }
    const passwordsMatch = bcrypt.compareSync(password, foundUser.password)
    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }
    const payload = foundUser.id
    const token = jwt.sign(payload, jwtSecret)
    res.json({ data: token, movies: userMovies });
};

module.exports = {
    register,
    login
};