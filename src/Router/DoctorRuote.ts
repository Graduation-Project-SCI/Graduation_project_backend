import { createDoctor,deleteDoctor,getAllDoctors,getDoctor,updateDoctor } from "../Controller/DoctorController";
import {Router} from 'express'

export const router:Router =Router()

router.post('/',createDoctor)

router.get('/',getAllDoctors)

router.get('/:id',getDoctor)

router.put('/:id',updateDoctor)

router.delete('/:id',deleteDoctor)

