import { Router } from 'express'
import ResearchController from '../Controller/ResearchController'
const router = Router()

router.post('/create', ResearchController.createResearch)
router.get('/getAll', ResearchController.getAllResearches)
router.get('/getById/:id', ResearchController.getResearchById)
router.put('/update/:id', ResearchController.updateResearch)
router.delete('/delete/:id', ResearchController.deleteResearch)
router.get('/getByMasterStudentId/:id', ResearchController.getResearchByMasterStudentId)
router.get('/getByDepartmentId/:id', ResearchController.getResearchByDepartmentId)
router.get('/getByTypeId/:id', ResearchController.getResearchByTypeId)
router.get('/getByAuthorId/:id', ResearchController.getResearchsByAuthorId)
router.get('/getBySupervisorId/:id', ResearchController.getResearchsBySupervisorId)

export default router
