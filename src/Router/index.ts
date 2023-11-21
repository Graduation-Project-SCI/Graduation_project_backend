import ProfessorRoute from "./ProfessorRuote"
import DepartmentRoute from "./DepartmentRoute"
import  { Router } from "express";

const routes = Router()

routes.use('/auth', ProfessorRoute)
routes.use('/professor', ProfessorRoute)
routes.use('/department', DepartmentRoute)


export default routes

