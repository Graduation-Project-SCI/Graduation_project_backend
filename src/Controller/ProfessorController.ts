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
    try {
      const professor = await prisma.professor.findUnique({
        where: {
          id: request.params.id as unknown as number,
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
      const { id, firstName, lastName, specialty, phoneNumber, image } = request.body;
      const professor = prisma.professor.update({
        data: {
          firstName,
          lastName,
          specialty,
          phoneNumber,
          image

        },
        where: {
          id: id,
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
        const {id} = request.body
        const professor = prisma.professor.delete({
            where: {
                id : id
            }
        })
        return sendResponse(response, 200, "success", professor)
    } catch (err : unknown) {
        return sendResponse(response, 404, "error can't delete department.", err)
    }
}
}
export default Professor;
