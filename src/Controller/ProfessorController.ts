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
          professorAttachment:true  
        }
      });
      return sendResponse(response, 200, "success", Professors);
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
          professorAttachment:true  
        }
      });
      return sendResponse(response, 200, "success", professor);
    } catch (err: unknown) {
      return sendResponse(
        response,
        404,
        "error can't get Professor invalid id.",
        err
      );
    }
  };

  public static updateProfessor = async (
    request: Request,
    response: Response
  ) => {
    try {
      const id = parseInt(request.params.id as string);
      const { fullName, specialty, phoneNumber, image } = request.body;
      const professor = await prisma.professor.update({
        where: {
          id
        },
        data: {
          fullName,
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
        return sendResponse(response, 404, "error can't delete department.", err)
    }
}
}
export default Professor;
