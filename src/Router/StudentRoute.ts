import { Router } from "express";
import studentController from "../Controller/StudentController"

const router = Router()

router.post('/create', studentController.createStudent)
router.get('/get/:id', studentController.getStudentById)
router.get('/get', studentController.getAllStudents)
router.put('/update/:id', studentController.updateStudent)
router.delete('/delete/:id', studentController.deleteStudent)

export default router;