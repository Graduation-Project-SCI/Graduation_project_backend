import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendResponse } from '../helper/sendResponse'
const prisma = new PrismaClient()

class Gender {
    public static createGender = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {name} = request.body
            const gender = await prisma.gender.create({
                data : {
                    name
                }
            });
            return sendResponse(response, 200, 'success',gender)
        } catch (err : unknown){
            return sendResponse(response, 404, "error can't create gender.", err)
        }
    }
    
    public static getAllGenders = async (
        request: Request,
        response: Response 
    ) => {
        try {
            const gender = await prisma.gender.findMany()
            return sendResponse(response, 200, "success",gender )
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get gender.", err)
        }
    }

    public static getGenderById = async (
        request : Request,
        response : Response
    ) => {
      const id = parseInt(request.params.id as string);

        try {
            const gender = await prisma.gender.findUnique({
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", gender)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get gender invalid id.", err)
        }
    }

    public static updateGender = async (
        request: Request,
        response: Response
    ) => {
        try {
            const name = request.body.name
            const id = parseInt(request.params.id as string);

            const gender = await prisma.gender.update({
                data : {
                    name
                },
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", gender)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't update gender.", err)
        }
    }

    public static deleteGender = async (
        request : Request,
        response : Response
    ) => {
        try {
          const id = parseInt(request.params.id as string);
          const gender = await prisma.gender.delete({
                where: {
                    id
                }
            })
            return sendResponse(response, 200, "success", gender)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't delete gender.", err)
        }
    }
}

export default Gender