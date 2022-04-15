const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const serverError = 'Something went wrong!';
const secretKey = '!vbs*dfj#bhn$ksh%vjk';
const noAccessError = 'Invalid username or password';

const registerUser = async (req, res) => {
	try {
		const registeredUser = await prisma.user.create({
			data: {
				username: req.body.username,
				password: await bcrypt.hash(req.body.password, 10),
			},
		});
		res.status(200).json({ registeredUser });
	} catch (err) {
		console.log(err);
		res.status(500).json(serverError);
	}
};

const loginUser = async (req, res) => {
	const typedPassword = req.body.password;
	const matchingUser = await prisma.user.findFirst({
		where: { username: req.body.username },
	});
	const matchingPassword = bcrypt.compare(typedPassword, matchingUser.password);
	if (matchingUser && matchingPassword) {
		const token = jwt.sign({ username: matchingUser.username }, secretKey);
		res.status(200).json({ token });
		return;
	}
	res.status(401).json({ noAccessError });

};

module.exports = {
	registerUser,
	loginUser
};
