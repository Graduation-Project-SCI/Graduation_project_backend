import ProfessorRoute from "./ProfessorRoute"
import DepartmentRoute from "./DepartmentRoute"
import ResearchRoute from "./ResearchRoute"
import TypeRoute from "./TypeRoute"
import StudentRoute from "./StudentRoute"
import ProfessorRoleRoute from "./ProfessorRoleRoute"
import ProfessorAttachmentRoute from './ProfessorAttachmentRoute'
import  { Router } from "express";

const routes = Router()

routes.use('/auth', ProfessorRoute)
routes.use('/professor', ProfessorRoute)
routes.use('/department', DepartmentRoute)
routes.use('/research', ResearchRoute)
routes.use('/type',TypeRoute)
routes.use('/student',StudentRoute)
routes.use('/professorRole',ProfessorRoleRoute)
routes.use('/professorAttachment',ProfessorAttachmentRoute)




export default routes

