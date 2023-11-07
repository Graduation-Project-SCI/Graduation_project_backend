import DoctorRoute from "./DoctorRuote"
import  { Router } from "express";

const routes = Router()

routes.use('/auth', DoctorRoute)

export default routes

