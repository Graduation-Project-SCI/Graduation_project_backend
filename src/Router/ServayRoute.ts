import { Router } from "express";
import ServayController from "../Controller/ServayController";
import tokenValidateMiddleware from "../Auth middleware/authMiddleware";
const tvm = tokenValidateMiddleware
const router = Router()

router.post('/create', tvm, ServayController.createServay)
router.get('/get', tvm, ServayController.getAllServays)
router.get('/get/:id', tvm, ServayController.getServayById)
router.put('/update/:id', tvm, ServayController.updateServay)
router.delete('/delete/:id', tvm, ServayController.deleteServay)

export default router;