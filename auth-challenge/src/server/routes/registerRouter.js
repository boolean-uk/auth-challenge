import { Router } from "express"
import { createUser } from "../controllers/createUser"

const router = Router()

router.post('/', createUser)


export default router