import { Router } from "express";
import professorAttachmentController from "../Controller/ProfessorAttachmentController"

const router = Router()

router.post('/create', professorAttachmentController.createProfessorAttachment)
router.get('/get/:id', professorAttachmentController.getProfessorAttachmentById)
router.get('/get', professorAttachmentController.getAllProfessorAttachment)
router.put('/update/:id', professorAttachmentController.updateProfessorAttachment)
router.delete('/delete/:id', professorAttachmentController.deleteProfessorAttachment)

export default router;