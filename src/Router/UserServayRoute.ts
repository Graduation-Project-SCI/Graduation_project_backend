import { Router } from "express";
import userServayController from "../Controller/UserServayController";
import tokenValidateMiddleware from "../Auth middleware/authMiddleware";
const tvm = tokenValidateMiddleware
const router = Router()

router.post('/create/:id', tvm, userServayController.create)
router.get('/get', tvm, userServayController.getAll)
router.get('/get/:id', tvm, userServayController.getById)
router.put('/update/:id', tvm, userServayController.update)
router.delete('/delete/:id', tvm, userServayController.delete)
router.get('/getByServayId/:id', tvm, userServayController.getByServayId)
router.get('/getByProfessortId/:id', tvm, userServayController.getByProfessorId)

export default router;