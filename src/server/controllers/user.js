const { Prisma } = require('@prisma/client')
const prisma = require('../utils/prisma')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secretKey = process.env.JWT_SECRET

const register = async (req, res) => {
	const { username, password } = req.body

	if (!username || !password) {
		return res.status(400).json({
			error: 'Missing fields in request body',
		})
	}

	try {
		const hashedPassw = await bcrypt.hash(password, 12)

		const registerUser = await prisma.user.create({
			data: {
				username,
				password: hashedPassw,
			},
		})
		res.status(200).json({ user: registerUser })
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return res.status(409).json({ error: 'Unique constraint failed' })
			}
		} else {
			return res.status(500).json({ error: e })
		}
	}
}

const login = async (req, res) => {
	const { username, password } = req.body

	if (!username || !password) {
		return res.status(400).json({
			error: 'Missing fields in request body',
		})
	}

	try {
		const result = await prisma.user.findUnique({
			where: {
				username,
			},
		})
		if (result) {
			const matchPassw = await bcrypt.compare(password, result.password)

			if (matchPassw) {
				const token = jwt.sign({ username }, secretKey)
				res.send({ token })
			} else res.status(401).send('Invalid username or password')
		}
	} catch (e) {
		return res.status(500).json({ error: e })
	}
}

module.exports = {
	register,
	login,
}
