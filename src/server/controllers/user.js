const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { use } = require('../routers/user');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10;
    // const createdUser = null;
    
   const hash = await bcrypt.hash(password, saltRounds)

    const createdUser = await prisma.user.create({
        data:{
            username: username,
            password: hash,
        }
    })
    res.json({ data: createdUser });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await prisma.user.findUnique({
        where:{
            username: username
        }
    });

    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }
    

    // const passwordsMatch = false;
    const passwordsMatch = await bcrypt.compare(password, foundUser.password)
    console.log("COMPARED HASH", passwordsMatch)

    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token =  jwt.sign( foundUser.username, jwtSecret);
    console.log("token", token)
    res.status(200).json({ data: token });
};

module.exports = {
    register,
    login
};