const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password, salt);

    try {
        const createdUser = await prisma.user.create({
            data: {
                username,
                password: this.password
            }
        });
    
        res.json({ data: createdUser });
    }

    catch(error){
        console.log(error);
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

module.exports = {
    register,
    login
};