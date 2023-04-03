const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";
const saltRounds = 10;

const register = async (req, res) => {
  //get user details from req.body
  const { username, password } = req.body;
  const createdUser = null;

  //hash the passsword:
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  try {
    const createdUser = await prisma.user.create({
      data: {
        username: username,
        password: hash,
      },
    });

    const userAndId = {
      id: createdUser.id,
      username: createdUser.username,
    };
    console.log("userAndId-----", userAndId);
    res.status(201).json({ user: userAndId });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const login = async (req, res) => {
  //get username and password
  const { username, password } = req.body;

  //check user exists
  const foundUser = await prisma.user.findUnique({
    where: { username },
  });

  //bcrypt to compare passwords and check that they match:
  const passwordsMatch = await bcrypt.compare(password, foundUser.password);

  //if not: errors
  if (!foundUser || !passwordsMatch) {
    return res.status(401).json({ error: "Invalid username or password." });
  } else {
    //if successful: assign token
    const token = jwt.sign(foundUser.username, jwtSecret);
    console.log("token----", token);
    res.json({ data: token });
  }
};

module.exports = {
  register,
  login,
};
