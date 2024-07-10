import { NextApiRequest, NextApiResponse } from 'next'
import * as data from '../../../lib/data'

export async function registerUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res
                .status(400)
                .send({ error: 'Requirements missing in the request body' })
        }
        const newUser = await data.registerUser({username, password})

        return res.status(201).send({user:newUser})
    } catch (e) {
        console.log(e.message)
        return res.status(500).send({ error: e.message })
    }
}
