import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendResponse } from '../helper/sendResponse'
const prisma = new PrismaClient()

class Department {
    public static createDepartment = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {name} = request.body
            const department = await prisma.department.create({
                data : {
                    name:name
                }
            });
            return sendResponse(response, 200, 'success', department)
        } catch (err : any){
            return sendResponse(response, 404, "error can't create department.", err)
        }
    }
    
    public static getAllDepartments = async (
        request: Request,
        response: Response 
    ) => {
        try {
            const departments = await prisma.department.findMany()
            return sendResponse(response, 200, "success", departments)
        } catch (err : any) {
            return sendResponse(response, 404, "error can't get departments.", err)
        }
    }

    public static getDepartmentById = async (
        request : Request,
        response : Response
    ) => {
        try {
            const department = await prisma.department.findUnique({
                where : {
                    id: (request.params.id as unknown as number)
                }
            })
            return sendResponse(response, 200, "success", department)
        } catch (err : any) {
            return sendResponse(response, 404, "error can't get department invalid id.", err)
        }
    }

    public static updateDepartment = async (
        request: Request,
        response: Response
    ) => {
        try {
            const {id, name} = request.body
            const department = prisma.department.update({
                data : {
                    name : name
                },
                where : {
                    id : id
                }
            })
            return sendResponse(response, 200, "success", department)
        } catch (err : any) {
            return sendResponse(response, 404, "error can't update department.", err)
        }
    }

    public static deleteDepartment = async (
        request : Request,
        response : Response
    ) => {
        try {
            const {id} = request.body
            const department = prisma.department.delete({
                where: {
                    id : id
                }
            })
            return sendResponse(response, 200, "success", department)
        } catch (err : any) {
            return sendResponse(response, 404, "error can't delete department.", err)
        }
    }
}

export default Department