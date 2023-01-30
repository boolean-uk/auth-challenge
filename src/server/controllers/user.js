const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET;

const register = async (req, res) => {
	const { username, password } = req.body;

	const foundUser = await prisma.user.findUnique({
		where: { username: username },
	});
	if (foundUser) {
		return res.status(409).json({ error: 'Username already exists.' });
	}

	bcrypt.hash(password, 12, async (err, encryptedPwd) => {
		if (err) return res.status(500).json({ error: err });

		try {
			const createdUser = await prisma.user.create({
				data: {
					username: username,
					password: encryptedPwd,
				},
			});
			delete createdUser.password;

			res.status(201).json({ user: createdUser });
		} catch (error) {
			res.status(500).json({
				error: `Code: ${error.code} - ${error.message}`,
			});
		}
	});
};

const login = async (req, res) => {
	const { username, password } = req.body;

	// Find Username
	const foundUser = await prisma.user.findUnique({
		where: { username: username },
	});
	if (!foundUser) {
		return res.status(401).json({ error: 'Invalid username or password.' });
	}

	// Match passwords
	const passwordsMatch = await bcrypt.compare(password, foundUser.password);
	if (!passwordsMatch) {
		return res.status(401).json({ error: 'Invalid username or password.' });
	}

	// Create Access Token
	const token = jwt.sign(
		{ id: foundUser.id, username: foundUser.username },
		jwtSecret
	);

	// Removes password from foundUser - adds Token
	delete foundUser.password;
	foundUser.accessToken = token;

	// Return User with AccessToken inside
	res.json({ user: foundUser });
};

module.exports = {
	register,
	login,
};
