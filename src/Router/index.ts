import DoctorRoute from "./DoctorRuote"
import DepartmentRoute from "./DepartmentRoute"
import ResearchRoute from "./ResearchRoute"
import  { Router } from "express";

const routes = Router()

routes.use('/auth', DoctorRoute)
routes.use('/department', DepartmentRoute)
routes.use('/research', ResearchRoute)


export default routes

