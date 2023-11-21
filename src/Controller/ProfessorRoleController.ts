import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendResponse } from '../helper/sendResponse'
const prisma = new PrismaClient()

class Degree {
    public static createProfessorRole = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {role} = request.body
            const professorRole = await prisma.professor_role.create({
                data : {
                    role
                }
            });
            return sendResponse(response, 200, 'success',professorRole)
        } catch (err : unknown){
            return sendResponse(response, 404, "error can't create Professor'role.", err)
        }
    }
    
    public static getAllProfessorRoles = async (
        request: Request,
        response: Response 
    ) => {
        try {
            const roles = await prisma.professor_role.findMany()
            return sendResponse(response, 200, "success", roles)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get roles.", err)
        }
    }

    public static getProfessorRoleById = async (
        request : Request,
        response : Response
    ) => {
      const id = parseInt(request.params.id as string);

        try {
            const role = await prisma.professor_role.findUnique({
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", role)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't get role invalid id.", err)
        }
    }

    public static updateProfessorRole = async (
        request: Request,
        response: Response
    ) => {
        try {
            const role = request.body.role
            const id = parseInt(request.params.id as string);

            const professor_role = await prisma.professor_role.update({
                data : {
                  role
                },
                where : {
                    id
                }
            })
            return sendResponse(response, 200, "success", professor_role)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't update role.", err)
        }
    }

    public static deleteProfessorRole = async (
        request : Request,
        response : Response
    ) => {
        try {
          const id = parseInt(request.params.id as string);
          const professor_role = await prisma.professor_role.delete({
                where: {
                    id
                }
            })
            return sendResponse(response, 200, "success", professor_role)
        } catch (err : unknown) {
            return sendResponse(response, 404, "error can't delete role.", err)
        }
    }
}

export default Degree