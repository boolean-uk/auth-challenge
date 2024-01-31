import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerNewUser } from '../domains/user.js';
const jwtSecret = 'mysecret';

const register = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password)
      return res
        .status(400)
        .json({ error: "Enter a valid username and password" });
  
    try {
      const passwordHash = await bcrypt.hash(password, 12);
  
      const createdUser = await registerNewUser(username, passwordHash);
      return res
        .status(201)
        .json({ data: createdUser, message: "Created user successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
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

export {
    register,
    login
};
