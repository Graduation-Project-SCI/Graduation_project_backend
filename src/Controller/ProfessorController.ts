import { Request, Response  } from "express";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../helper/sendResponse";
const prisma = new PrismaClient();
class Professor {
  public static getAllProfessors = async (
    request: Request,
    response: Response
  ) => {
    try {
      const Professors = await prisma.professor.findMany({
        include:{
          professorAttachment:true,
          department:true  
        }
      });
      let professorsWithoutPassword: Array<Omit<Professor, 'password'>> = [];

      for (let i = 0; i < Professors.length; i++) {
        const { password, ...professorWithoutPassword } = Professors[i] as {password:string};
        professorsWithoutPassword.push(professorWithoutPassword);
      }
      return sendResponse(response, 200, "success", professorsWithoutPassword);
    } catch (err: unknown) {
      return sendResponse(response, 404, "error can't get Professors.", err);
    }
  };

  public static getProfessorById = async (
    request: Request,
    response: Response
  ) => {
    const id = parseInt(request.params.id as string);
    try {
      const professor = await prisma.professor.findUnique({
        where: {
          id
        },
        include:{
          professorAttachment:true,  
          department:true,
          
        }
      });
      const { password, ...professorWithoutPassword } = professor as { password: string };
      return sendResponse(response, 200, "success", professorWithoutPassword);
    } catch (err: unknown) {
      return sendResponse(
        response,
        404,
        "error can't get Professor invalid id.",
        err
      );
    }
  };

  public static getProfessor = async (request: Request, response: Response) => {
    const user = request.body.decoded.user;
    try {
      const professor = await prisma.professor.findUnique({
        where: {
          id: user.id,
        },
        include:{
          professorAttachment:true,  
          department:true,
          
        }
      });
      const { password, ...professorWithoutPassword } = professor as { password: string };
      return sendResponse(response, 200, "success", professorWithoutPassword);
    } catch (err: unknown) {
      return sendResponse(
        response,
        404,
        "error can't get Professor invalid id.",
        err
      );
    }
  }

  public static updateProfessor = async (
    request: Request,
    response: Response
  ) => {
    try {
      const id = parseInt(request.params.id as string);
      const { fullName,role, specialty, phoneNumber, image } = request.body;
      const professor = await prisma.professor.update({
        where: {
          id
        },
        data: {
          fullName,
          role,
          specialty,
          phoneNumber,
          image
        },
      });
      return sendResponse(response, 200, "success", professor);
    } catch (err: unknown) {
      return sendResponse(response, 404, "error can't update Professor.", err);
    }
  };

  public static deleteProfessor = async (
    request : Request,
    response : Response
) => {
    try {
      const id = parseInt(request.params.id as string);
      const professor = await prisma.professor.delete({
            where: {
                id
            }
        })
        return sendResponse(response, 200, "success", professor)
    } catch (err : unknown) {
        return sendResponse(response, 404, "error can't delete Professor.", err)
    }
}
}
export default Professor;
