import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const register = async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
  
    if (existingUser) {
      return res.status(400).json({ message: "Already registered" });
    }
  
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  
    const token = jwt.sign({ userId: newUser.id }, jwtSecret, {
      expiresIn: "24h",
    });
  
    res.status(201).json({ data: newUser, token });
  };
  
  const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const foundUser = await prisma.user.findUnique({
        where: { username },
      });
  
      if (!foundUser) {
        return res.status(401).json({ error: "Not valid username or password" });
      }
  
      const passwordsMatch = await bcrypt.compare(password, foundUser.password);
  
      if (passwordsMatch) {
        const token = jwt.sign({ username: foundUser.username }, jwtSecret, {
          expiresIn: "24h",
        });
        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ error: "Not valid username or password" });
      }
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ error: "Error logging in" });
    }
  };

export { register, login };
