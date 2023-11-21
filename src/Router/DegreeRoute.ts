import { Router } from "express";
import degreeController from "../Controller/DegreeController"

const router = Router()

router.post('/create', degreeController.createDegree)
router.get('/get/:id', degreeController.getDegreeById)
router.get('/get', degreeController.getAllDegrees)
router.put('/update/:id', degreeController.updateDegree)
router.delete('/delete/:id', degreeController.deleteDegree)

export default router;