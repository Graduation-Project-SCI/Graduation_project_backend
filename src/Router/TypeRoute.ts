import { Router } from "express";
import typeController from "../Controller/TypeController"

const router = Router()

router.post('/create', typeController.createType)
router.get('/get/:id', typeController.getTypeById)
router.get('/get', typeController.getAllTypes)
router.put('/update/:id', typeController.updatType)
router.delete('/delete/:id', typeController.deleteType)

export default router;