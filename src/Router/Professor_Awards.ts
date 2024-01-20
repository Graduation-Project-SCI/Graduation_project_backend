import { Router } from "express";
import Professor_Awards from "../Controller/Professor_Awards"
import tokenValidateMiddleware from "../Auth middleware/authMiddleware";
const tvm = tokenValidateMiddleware
const router = Router()

router.get('/get', Professor_Awards.getAllProfessor_Awards)
router.get('/get/:id', tvm, Professor_Awards.getProfessor_AwardsById)
router.put('/update/:id', tvm, Professor_Awards.updateProfessor_Awards)
router.delete('/delete/:id', tvm, Professor_Awards.deleteProfessor_Awards)

export default router;