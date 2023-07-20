const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = 'mysecret';


const register = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password cannot be empty.' });
    }
  
    try {
      const existingUser = await prisma.user.findUnique({
        where: { username: username }
      });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const createdUser = await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword
        }
      });
  
      res.json({ data: createdUser });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ error: 'Error occurred.' });
    }
  };
  
  const login = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password cannot be empty.' });
    }
  
    try {
      const foundUser = await prisma.user.findUnique({
        where: { username: username }
      });
  
      if (!foundUser) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }
  
      const passwordsMatch = await bcrypt.compare(password, foundUser.password);
  
      if (!passwordsMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }
  
      const token = jwt.sign({ username: username }, jwtSecret);
      res.json({ data: token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Error occurred.' });
    }
  };

module.exports = {
    register,
    login
};