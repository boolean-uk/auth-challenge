const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerUser = (req, res) => {
  res.send("hello");
};

module.exports = { registerUser };
