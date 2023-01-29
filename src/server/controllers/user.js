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


// const createToken = (id) => {
//     return jwt.sign({ id }, jwtSecret, {
//         expiresIn: maxAge
//     });
// }

const login = async (req, res) => {
    const { username, password } = req.body;
    
    const foundUser = await prisma.user.findUnique({
        where: {
            username: username
        },
    });

    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const passwordsMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const maxAge = 3 * 24 * 60 * 60
    const token = jwt.sign(foundUser.id, jwtSecret);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ jwt: token });
};

module.exports = {
    register,
    login
};