import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';

const register = async (req, res) => {
    try  {

        const { username, password } = req.body;

        // check if  username alreaady exists
        const  existingUser  =  await prisma.user.findUnique({
            where: { username}
        })
        if(existingUser) {
            return res.status(400).json({error: 'username already taken'})
        }
        // const createdUser = null;
        
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10); 
        console.log("hashed password", hashedPassword)


        const createdUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword 
            }
        })
        res.status(201).json({ message: ` ${createdUser.username} was successfully created !`
         });
    } catch (error){
        console.error('Registration error:', error.message);
        res.status(500).json({  error: 'Internal server error!'})
    }
};

const login = async (req, res) => {
    try {
        
        const { username, password } = req.body;
    
        const foundUser = await prisma.user.findUnique({
            where: { username}
        })
    
        if (!foundUser) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }
    
        const passwordsMatch = await bcrypt.compare(password, foundUser.password)
    
        if (!passwordsMatch) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }
    
        const token = jwt.sign({
            userId: foundUser.id, username:  foundUser.username
        }, jwtSecret, { expiresIn: '1h' })
    
        res.json({ message: 'Login successfully!', token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({  error: 'Internal server error!'})
    }
};

export {
    register,
    login
};
