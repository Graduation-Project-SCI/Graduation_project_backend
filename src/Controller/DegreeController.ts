import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendResponse } from '../helper/sendResponse'
const prisma = new PrismaClient()

class Degree {
    public static createDegree = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {name} = request.body
            const degree = await prisma.degree.create({
                data : {
                    name
                }
            });
            return sendResponse(response, 200, 'success',degree)
        } catch (err : unknown){
            return sendResponse(response, 404, "error can't create Degree.", err)
        }
    }
    
    public static getAllDegrees = async (
        request: Request,
        response: Response 
    ) => {
        try {
            const degrees = await prisma.degree.findMany()
            return sendResponse(response, 200, "success", degrees)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get degrees.", err)
        }
    }

    public static getDegreeById = async (
        request : Request,
        response : Response
    ) => {
      const id = parseInt(request.params.id as string);

        try {
            const degree = await prisma.degree.findUnique({
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", degree)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get department invalid id.", err)
        }
    }

    public static updateDegree = async (
        request: Request,
        response: Response
    ) => {
        try {
            const name = request.body.name
            const id = parseInt(request.params.id as string);

            const degree = await prisma.degree.update({
                data : {
                    name
                },
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", degree)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't update degree.", err)
        }
    }

    public static deleteDegree = async (
        request : Request,
        response : Response
    ) => {
        try {
          const id = parseInt(request.params.id as string);
          const degree = await prisma.degree.delete({
                where: {
                    id
                }
            })
            return sendResponse(response, 200, "success", degree)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't delete degree.", err)
        }
    }
}

export default Degree