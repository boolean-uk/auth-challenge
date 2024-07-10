import jwt from "jsonwebtoken"

import { createUserDb, getUserByUserNameDb } from "../domains/user.js"

import { ExistingDataError, MissingFieldsError } from "../errors/errors.js"

export const createUser = async (req, res) => {
	const { username, password } = req.body

	if (!username || !password) {
		throw new MissingFieldsError(
			"Both username AND password must be provided in order to register a new user"
		)
	}

    const existingUser = await getUserByUserNameDb(username)
    
    if (existingUser) {
        throw new ExistingDataError('This username is already in use')
    }

	const newUser = await createUserDb(username, password)
	res.status(201).json({ newUser: newUser })
}
