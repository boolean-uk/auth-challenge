const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// process.env(JWT_SECRET);

const register = async (req, res) => {
	const { username, password } = req.body;

	// TODO: Check if username already exists - BACK-END not FRONT
	const foundUser = await prisma.user.findUnique({
		where: { username: username },
	});
	if (foundUser) {
		return res.status(409).json({ error: 'Username already exists.' });
	}

	// TODO: Hash pwd
	bcrypt.hash(password, 12, async (err, encryptedPwd) => {
		if (err) return res.status(500).json({ encryptionError: err });

		// TODO: Add User to DB
		try {
			const createdUser = await prisma.user.create({
				data: {
					username: username,
					password: encryptedPwd,
				},
			});
			delete createdUser.password;

			res.status(201).json({ data: createdUser });
		} catch (error) {
			res.status(500).json({
				prismaError: `Code: ${error.code} - ${error.message}`,
			});
		}
	});
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

module.exports = {
	register,
	login,
};
