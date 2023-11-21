import ProfessorRoute from "./ProfessorRoute"
import DepartmentRoute from "./DepartmentRoute"
import DegreeRoute from "./DegreeRoute"
import GenderRoute from "./GenderRoute"
import TypeRoute from "./TypeRoute"
import  { Router } from "express";

const routes = Router()

routes.use('/auth', ProfessorRoute)
routes.use('/professor', ProfessorRoute)
routes.use('/department', DepartmentRoute)
routes.use('/degree', DegreeRoute)
routes.use('/gender',GenderRoute)
routes.use('/type',TypeRoute)





export default routes

