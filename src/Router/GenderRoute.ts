import { Router } from "express";
import genderController from "../Controller/GenderController"

const router = Router()

router.post('/create', genderController.createGender)
router.get('/get/:id', genderController.getGenderById)
router.get('/get', genderController.getAllGenders)
router.put('/update/:id', genderController.updateGender)
router.delete('/delete/:id', genderController.deleteGender)

export default router;