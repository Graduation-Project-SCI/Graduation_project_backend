import { Router } from "express";
import departmentController from "../Controller/DepartmentController"

const router = Router()

router.post('/create', departmentController.createDepartment)
router.get('/get/:id', departmentController.getDepartmentById)
router.get('/get', departmentController.getAllDepartments)
router.put('/update/:id', departmentController.updateDepartment)
router.delete('/delete/:id', departmentController.deleteDepartment)

export default router;