import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendResponse } from '../helper/sendResponse'
const prisma = new PrismaClient()

class Type {
    public static createType = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {name} = request.body
            const type = await prisma.type.create({
                data : {
                    name
                }
            });
            return sendResponse(response, 200, 'success',type)
        } catch (err : unknown){
            return sendResponse(response, 404, "error can't create type.", err)
        }
    }
    
    public static getAllTypes = async (
        request: Request,
        response: Response 
    ) => {
        try {
            const types = await prisma.type.findMany()
            return sendResponse(response, 200, "success", types)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get types.", err)
        }
    }

    public static getTypeById = async (
        request : Request,
        response : Response
    ) => {
      const id = parseInt(request.params.id as string);

        try {
            const type = await prisma.type.findUnique({
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", type)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get type invalid id.", err)
        }
    }

    public static updatType = async (
        request: Request,
        response: Response
    ) => {
        try {
            const name = request.body.name
            const id = parseInt(request.params.id as string);

            const type = await prisma.type.update({
                data : {
                    name
                },
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", type)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't update type.", err)
        }
    }

    public static deleteType = async (
        request : Request,
        response : Response
    ) => {
        try {
          const id = parseInt(request.params.id as string);
          const type = await prisma.type.delete({
                where: {
                    id
                }
            })
            return sendResponse(response, 200, "success", type)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't delete type.", err)
        }
    }
}

export default Type