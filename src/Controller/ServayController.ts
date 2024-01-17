import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendResponse } from '../helper/sendResponse'
const prisma = new PrismaClient()

class Servay {
    public static createServay = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {name} = request.body as {name:string}
            const servayCreated = await prisma.servay.create({
                data : {
                    name
                }
            });
            return sendResponse(response, 200, 'success', servayCreated)
        } catch (err : unknown){
            return sendResponse(response, 404, "error can't create servay.", err)
        }
    }

    public static getAllServays = async (
        request: Request,
        response: Response 
    ) => {
        try {
            const servays = await prisma.servay.findMany()
            return sendResponse(response, 200, "success", servays)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get servays.", err)
        }
    }

    public static getServayById = async (
        request : Request,
        response : Response
    ) => {
      const id = parseInt(request.params.id as string);

        try {
            const servay = await prisma.servay.findUnique({
                where : {
                    id
                },include : {
                    questions : {
                        include : {
                            answers : true
                        }
                    }
                }
            })
            return sendResponse(response, 200, "success", servay)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get servay invalid id.", err)
        }
    }

    public static updateServay = async (
        request: Request,
        response: Response
    ) => {
        try {
            const name = request.body.name
            const id = parseInt(request.params.id as string);
            const servay = await prisma.servay.update({
                where : {
                    id
                },
                data : {
                    name
                }
            })
            return sendResponse(response, 200, "success", servay)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't update servay invalid id.", err)
        }
    }

    public static deleteServay = async (
        request: Request,
        response: Response
    ) => {
        try {
            const id = parseInt(request.params.id as string);
            const servayDeleted = await prisma.servay.delete({
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", servayDeleted)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't delete servay invalid id.", err)
        }
    }
}

export default Servay