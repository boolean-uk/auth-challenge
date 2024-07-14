import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { createUserDb, getUserByIdDb, getUserByUserNameDb } from "../domains/user.js"
import {
	ExistingDataError,
	MissingFieldsError,
	DataNotFoundError,
	InvalidCredentialsError,
} from "../errors/errors.js"

export const createUser = async (req, res) => {
	const { username, password } = req.body
	if (!username || !password) {
		throw new MissingFieldsError(
			"Both username AND password must be provided in order to register a new user"
		)
	}

	const existingUser = await getUserByUserNameDb(username)
	if (existingUser) {
		throw new ExistingDataError("This username is already in use")
	}
	
	const newUser = await createUserDb(username, password)
	res.status(201).json({ newUser: newUser})
}

export const logInUser = async (req, res) => {
	const { username, password } = req.body

	if (!username || !password) {
		throw new MissingFieldsError(
			"Username AND password must be provided in order to login"
		)
	}

	const existingUser = await getUserByUserNameDb(username)
	if (!existingUser) {
		throw new DataNotFoundError(
			"The provided username does not exist"
		)
	}

	const validPass = await bcrypt.compare(
		password,
		existingUser.password
	)
	if (!validPass) {
		throw new InvalidCredentialsError(
			"Invalid password. Access Denied!!!"
		)
	}

	const payload = { username: existingUser.username }
	const token = jwt.sign(payload, process.env.JWT_SECRET)
	res.status(200).json({ token })
}

export const getUserById = async (req, res) => {
	const userId = Number(req.params.id)
	const user = await getUserByIdDb(userId)
	res.status(200).json({user})
}
