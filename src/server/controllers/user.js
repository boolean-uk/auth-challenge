import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
const secret = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and Password are required",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    res.status(201).json({ user: newUser });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return res.status(409).json({
          error: "A user with with this username already exists",
        });
      }
    }
    console.log("error:", err);
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: foundUser.id }, secret);
    res.status(200).json({ token: token });
  } catch (err) {
    console.log("Error:", err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();

    res.status(200).json({ users: allUsers });
  } catch (err) {
    console.log("Error", err);
  }
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ 
      message: `Deleted user ${id} successfully`,
    });

  } catch (err) {
    console.log("Error:", err);
  }
}
export { registerUser, loginUser, getAllUsers, deleteUser };
