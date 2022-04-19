const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const secret = "jwtSecret"
const errorMessage = 'Invalid username or password.'

 const registerUser = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10)

    const createdUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    });

    res.json({ message: "User Created" });
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

   

    const foundUser = await prisma.user.findFirst({
        where: {
            username
        }
    });

    if (!foundUser) {
        return res.status(401).json({ error: errorMessage });
    }

    const passwordsMatch = bcrypt.compareSync(password, foundUser.password);

    if (!passwordsMatch) {
        return res.status(401).json({ error: errorMessage });
    }

    const token = jwt.sign({ username }, secret);

    res.json({ data: token });
}


module.exports = {
    registerUser,
    loginUser
}