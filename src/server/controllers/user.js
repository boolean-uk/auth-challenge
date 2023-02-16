const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { user } = require("../../utils/prisma");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const register = async (req, res) => {
	const { username, password } = req.body;
	const saltRounds = 10;

	bcrypt.hash(password, saltRounds, async (err, hashed_pw) => {
		try {
			const newUser = await prisma.user.create({
				data: {
					username,
					password: hashed_pw,
				},
			});

			delete newUser.password;
			res.status(201).json({ user: newUser });
		} catch (error) {
			if (error.code === "P2002") {
				res.status(403).json({ error: "The username is already taken" });
			} else {
				res.status(500).json({ error });
			}
		}
	});
};

const login = async (req, res) => {
	const { username, password } = req.body;

	const foundUser = await prisma.user.findUnique({
		where: {
			username: username,
		},
	});

	if (!foundUser) {
		return res.status(401).json({ error: "Invalid username or password." });
	}

	bcrypt.compare(password, user.password, (passwordsMatch) => {
		if (!passwordsMatch) {
			res.status(401).json({ error: "Invalid username or password" });
		} else {
			const token = jwt.sign(
				{ sub: user.id, username: user.username },
				jwtSecret
			);
			res.json({ data: token });
		}
	});
};

module.exports = {
	register,
	login,
};
