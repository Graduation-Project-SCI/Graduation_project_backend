import { Router } from 'express'
import AuthController from '../Controller/AuthController'
import ProfessorController from '../Controller/ProfessorController'
import tokenValidateMiddleware from '../Auth middleware/authMiddleware'
const router = Router()
const tvm = tokenValidateMiddleware

router.post('/login', AuthController.login)
router.post('/createUser', AuthController.createUser)
router.get('/allProfessors', tvm, ProfessorController.getAllProfessors)
router.get('/:id', tvm, ProfessorController.getProfessorById)
router.put('/update/:id', tvm, ProfessorController.updateProfessor)
router.delete('/delete/:id', tvm, ProfessorController.deleteProfessor)


export default router

