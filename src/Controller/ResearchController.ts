import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendResponse } from '../helper/sendResponse';

const prisma = new PrismaClient();

class ResearchController {
    public static createResearch = async (
        request: Request,
        response: Response
    ) => {
        try {
            const research = await prisma.research.create({ data: request.body });
            return sendResponse(response, 200, 'success', research);
        } catch (error) {
            return sendResponse(response, 405, "error can't create research.", error);
        }
    }

    public static getAllResearches = async (
        request: Request,
        response: Response
    ) => {
        try {
            const researches = await prisma.research.findMany();
            return sendResponse(response, 200, 'success', researches);
        } catch (error) {
            return sendResponse(response, 404, "error can't get researches.", error);
        }
    }

    public static getResearchById = async (
        request: Request,
        response: Response
    ) => {
        try {
            const research = await prisma.research.findUnique({
                where: {
                    id: request.params.id as unknown as number,
                },
            });
            return sendResponse(response, 200, 'success', research);
        } catch (error) {
            return sendResponse(response, 404, "error can't get research invalid id.", error);
        }
    }

    public static updateResearch = async (
        request: Request,
        response: Response
    ) => {
        try {
            const research = await prisma.research.update({
                where: {
                    id: request.params.id as unknown as number,
                },
                data: request.body,
            });
            return sendResponse(response, 200, 'success', research);
        } catch (error) {
            return sendResponse(response, 404, "error can't update research invalid id.", error);
        }
    }

    public static deleteResearch = async (
        request: Request,
        response: Response
    ) => {
        try {
            const research = await prisma.research.delete({
                where: {
                    id: request.params.id as unknown as number,
                },
            });
            return sendResponse(response, 200, 'success', research);
        } catch (error) {
            return sendResponse(response, 404, "error can't delete research invalid id.", error);
        }
    }

    public static getResearchByMasterStudentId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const researches = await prisma.research.findMany({
                where: {
                    masterStudentId: request.params.id as unknown as number,
                },
            });
            return sendResponse(response, 200, 'success', researches);
        } catch (error) {
            return sendResponse(response, 404, "error can't get researches invalid id.", error);
        }
    }

    public static getResearchByTypeId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const researches = await prisma.research.findMany({
                where: {
                    typeId: request.params.id as unknown as number,
                },
            });
            return sendResponse(response, 200, 'success', researches);
        } catch (error) {
            return sendResponse(response, 404, "error can't get researches invalid id.", error);
        }
    }

    public static getResearchByDepartmentId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const researches = await prisma.research.findMany({
                where: {
                    departmentId: request.params.id as unknown as number,
                },
            });
            return sendResponse(response, 200, 'success', researches);
        } catch (error) {
            return sendResponse(response, 404, "error can't get researches invalid id.", error);
        }
    }

    public static getResearchsByAuthorId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const researches = await prisma.research.findMany({
                where: {
                    authorId: request.params.id as unknown as number,
                },
            });
            return sendResponse(response, 200, 'success', researches);
        } catch (error) {
            return sendResponse(response, 404, "error can't get researches invalid id.", error);
        }
    }

    public static getResearchsBySupervisorId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const researches = await prisma.research.findMany({
                where: {
                    supervisorId: request.params.id as unknown as number,
                },
            });
            return sendResponse(response, 200, 'success', researches);
        } catch (error) {
            return sendResponse(response, 404, "error can't get researches invalid id.", error);
        }
    }
}

export default ResearchController;
