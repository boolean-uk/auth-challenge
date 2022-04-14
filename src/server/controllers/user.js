const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const serverError = 'Something went wrong';
const secretKey = '!vbs*dfj#bhn$ksh%vjk';

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

const loginUser = async (req, res) => {};

module.exports = {
	registerUser,
	loginUser,
};
