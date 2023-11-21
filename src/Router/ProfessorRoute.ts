import { Router } from 'express'
import AuthController from '../Controller/AuthController'
import ProfessorController from '../Controller/ProfessorController'
const router = Router()

router.post('/login', AuthController.login)
router.post('/createUser',AuthController.createUser)
router.get('/allProfessors', ProfessorController.getAllProfessors)
router.get('/:id', ProfessorController.getProfessorById)
router.put('/update/:id', ProfessorController.updateProfessor)
router.delete('/delete/:id', ProfessorController.deleteProfessor)


export default router

