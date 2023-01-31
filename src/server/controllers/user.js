const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


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

        // delete the created password
        delete createdUser.password
        res.json({ data: createdUser });
    }

    catch(error){
        if(error.code === 'P2002'){
            res.status(403).json({error: `The username with ${username} is already exits`});
        }
         
        else{
            res.status(503).json({error})
        }  

};
}
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

    const passwordsMatch = await bcrypt.compare( password, foundUser.password );

    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const jwtSecret = process.env.jwtSecret; 
    
    const token = jwt.sign( foundUser.id, jwtSecret );
    
    res.status(200).json({ jwt: token });
};

module.exports = {
    register,
    login
};