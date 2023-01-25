const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
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
		} catch (e) {
			if (e.code === "P2002") {
				res.status(403).json({ error: "The username is already taken" });
			} else {
				res.status(500).json({ error: e });
			}
		}
	});
};

const login = async (req, res) => {
	const { username, password } = req.body;

	const foundUser = null;

	if (!foundUser) {
		return res.status(401).json({ error: "Invalid username or password." });
	}

	const passwordsMatch = false;

	if (!passwordsMatch) {
		return res.status(401).json({ error: "Invalid username or password." });
	}

	const token = null;

	res.json({ data: token });
};

module.exports = {
	register,
	login,
};
