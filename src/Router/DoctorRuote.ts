import { Router } from 'express'
import AuthController from '../Controller/AuthController'
const router = Router()

router.post('/login', AuthController.login)
router.post('/createUser',AuthController.createUser)

export default router

