import ProfessorRoute from "./ProfessorRoute"
import DepartmentRoute from "./DepartmentRoute"
import ResearchRoute from "./ResearchRoute"
import StudentRoute from "./StudentRoute"
import ProjectRoute from "./ProjectRoute"
import ProfessorAttachmentRoute from './ProfessorAttachmentRoute'
import AuthRoute from "./AuthRoute"
import AnswerRoute from "./AnswerRoute"
import QuestionRoute from "./QuestionRoute"
import ResponsesRoute from "./ResponsesRoute"
import  { Router } from "express";

const routes = Router()

routes.use('/auth', AuthRoute)
routes.use('/professor', ProfessorRoute)
routes.use('/project', ProjectRoute)
routes.use('/department', DepartmentRoute)
routes.use('/research', ResearchRoute)
routes.use('/student',StudentRoute)
routes.use('/professorAttachment',ProfessorAttachmentRoute)
routes.use('/answer', AnswerRoute)
routes.use('/question', QuestionRoute)
routes.use('/responses', ResponsesRoute)

export default routes

