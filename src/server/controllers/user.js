import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const jwtSecret = 'mysecret';

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: createdUser.id }, jwtSecret, {
      expiresIn: '1h',
    });

    res.json({
      data: {
        user: createdUser,
        token,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await prisma.user.findMany({ where: { username } });

    if (!foundUser) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const passwordsMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordsMatch) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ userId: foundUser.id }, jwtSecret, {
      expiresIn: '1h',
    });

    res.json({ data: token });
  } catch (error) {
    console.error('An error occurred during login:', error);
    res.status(500).json({ error: 'Internal server error.' });
  } finally {
    await prisma.$disconnect();
  }
};

export { register, login };
