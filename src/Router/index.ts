import DoctorRoute from "./DoctorRuote"
import DepartmentRoute from "./DepartmentRoute"
import  { Router } from "express";

const routes = Router()

routes.use('/auth', DoctorRoute)
routes.use('/department', DepartmentRoute)


export default routes

