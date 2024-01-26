import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {prisma} from '../../utils/prisma.js'
import  userDatabase  from '../../domain/UserDb.js';
const secret = process.env.JWT_SECRET;



const register = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12)

    const createdUser = await userDatabase(username, hashedPassword);

    delete createdUser.password
    res.json({ data: createdUser});
   
    

};

const login = async (req, res) => {
    
    const { username, password } = req.body;

    const foundUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    
    if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }
    const passwordsMatch = await bcrypt.compare(password, foundUser.password)

    if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const createToken = (payload, secret)=>{
        const result = jwt.sign(payload,secret);
        return result;
    }
    const token = createToken(password,secret);

    res.json({ data: token });
};

export {
    register,
    login
};
