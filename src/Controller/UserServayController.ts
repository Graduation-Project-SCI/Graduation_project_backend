import e, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helper/sendResponse";
import { request } from "http";
const prisma = new PrismaClient();

class UserServay {
    public static create = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const { surveyId } = request.body;
            const getSurvey = await prisma.userServay.findMany({
                where: {
                    AND: {
                        professorId: parseInt(id),
                        servayId: parseInt(surveyId),
                    },
                },
            });
            if (getSurvey.length > 0) {
                return sendResponse(response, 400, "Survey already exists");
            }
            const userServay = await prisma.userServay.create({
                data: {
                    professorId: parseInt(id),
                    servayId: parseInt(surveyId),
                },
            });
            return sendResponse(response, 200, "success", userServay);
        } catch (err : unknown) {
            return sendResponse(response, 500, "error", err);
        }
    }

    public static getAll = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const userServay = await prisma.userServay.findMany({
                where: {
                    professorId: parseInt(id),
                },
            });
            return sendResponse(response, 200, "success", userServay);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }

    public static getById = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const userServay = await prisma.userServay.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
            return sendResponse(response, 200, "success", userServay);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }

    public static update = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const { servayId } = request.body;
            const userServay = await prisma.userServay.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    servayId: parseInt(servayId),
                },
            });
            return sendResponse(response, 200, "success", userServay);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }

    public static delete = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const userServay = await prisma.userServay.delete({
                where: {
                    id: parseInt(id),
                },
            });
            return sendResponse(response, 200, "success", userServay);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }

    public static getByServayId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const userServay = await prisma.userServay.findMany({
                where: {
                    servayId: parseInt(id),
                },
            });
            return sendResponse(response, 200, "success", userServay);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }

    public static getByProfessorId = async (
        request: Request,
        response: Response
    ) => {
        try {
            const { id } = request.params;
            const userServay = await prisma.userServay.findMany({
                where: {
                    professorId: parseInt(id),
                },
            });
            return sendResponse(response, 200, "success", userServay);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }

    public static getProfessorSurvey = async (
        request: Request,
        response: Response
    ) => {
        try {
            const professorId = request.body.decoded.user.id;
            const userServay = await prisma.userServay.findMany({
                where: {
                    professorId:professorId
                },include: {
                    servay: true
                }
            });
            return sendResponse(response, 200, "success", userServay);
        } catch (err : unknown) {
            return sendResponse(response, 404, "error", err);
        }
    }
}

export default UserServay;