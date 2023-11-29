import ProfessorRoute from "./ProfessorRoute"
import DepartmentRoute from "./DepartmentRoute"
import ResearchRoute from "./ResearchRoute"
import StudentRoute from "./StudentRoute"
import ProfessorAttachmentRoute from './ProfessorAttachmentRoute'
import AuthRoute from "./AuthRoute"
import  { Router } from "express";

const routes = Router()

routes.use('/auth', AuthRoute)
routes.use('/professor', ProfessorRoute)
routes.use('/department', DepartmentRoute)
routes.use('/research', ResearchRoute)
routes.use('/student',StudentRoute)
routes.use('/professorAttachment',ProfessorAttachmentRoute)




export default routes

