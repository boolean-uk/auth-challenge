const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12)

        const createdUser = await prisma.user.create({
            data:{
                username,
                password: hashedPassword
            }
        })
        
        res.status(201).json({ data: createdUser });
    } catch (error) {
        res.status(500).json({error: 'Its an error'})}
    }



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

    const passwordsMatch = await bcrypt.compare(password, foundUser.password);
;

    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({username},jwtSecret,{ expiresIn: '1h' });
    res.json({ data: token });
    console.log('Generated token:', token);
};

module.exports = {
    register,
    login
};