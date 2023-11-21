import { Router } from "express";
import professorRoleController from "../Controller/ProfessorRoleController"

const router = Router()

router.post('/create', professorRoleController.createProfessorRole)
router.get('/get/:id', professorRoleController.getProfessorRoleById)
router.get('/get', professorRoleController.getAllProfessorRoles)
router.put('/update/:id', professorRoleController.updateProfessorRole)
router.delete('/delete/:id', professorRoleController.deleteProfessorRole)

export default router;