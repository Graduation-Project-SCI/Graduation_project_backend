import { Router } from 'express'
import ProjectsController from '../Controller/ProjectController'
import tokenValidateMiddleware from '../Auth middleware/authMiddleware'
const router = Router()
const tvm = tokenValidateMiddleware

router.post('/create', ProjectsController.createProject)
router.get('/allProjects', tvm, ProjectsController.getAllProjects)
router.get('/getProjectsById/:id', tvm, ProjectsController.getProjectById)
router.put('/update/:id', tvm, ProjectsController.updateProject)
router.delete('/delete/:id', tvm, ProjectsController.deleteProject)


export default router
