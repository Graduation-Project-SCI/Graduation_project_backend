import ProfessorRoute from "./ProfessorRoute"
import DepartmentRoute from "./DepartmentRoute"
import DegreeRoute from "./DegreeRoute"
import  { Router } from "express";

const routes = Router()

routes.use('/auth', ProfessorRoute)
routes.use('/professor', ProfessorRoute)
routes.use('/department', DepartmentRoute)
routes.use('/degree', DegreeRoute)



export default routes

