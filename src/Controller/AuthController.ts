import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaClient} from '@prisma/client';
import { sendResponse } from '../helper/sendResponse';
import { config } from '../../config';

const prisma = new PrismaClient();

class AuthController {
  public static createUser = async (
    request: Request,
    response: Response
  ) => {
    try {
      const {email, password} = request.body;
      if (!AuthController.isValidEmail(email)) {
        return response.status(400).json('Invalid Email!');
      }
      const hashedPassword = await bcrypt.hash(
        `${password}${config.jwt.pepper}`,
        parseInt(config.jwt.salt as string)
      );
      request.body.password = hashedPassword;
      const user = await prisma.professor.create({ data: request.body });
      const { password: _, ...userWithoutPassword } = user; 
      const accessToken = generateAccessToken(userWithoutPassword, request);
      sendResponse(response, 200, "success", {
        user: userWithoutPassword,
        token: accessToken,
      });
    } catch (error) {
      response.json(error);
    }
  };

  public static login = async (request: Request, response: Response) => {
    if (request.body.email != null && request.body.password != null) {
      try {
        let {email, password} = request.body;
        if (!AuthController.isValidEmail(email)) {
          return response.status(400).json('Invalid Email!');
        }
        const user = await prisma.professor.findUnique({
          where: {
            email: email,
          },
        });
        if (user == null) {
          return response.status(404).json('User does not exist!');
        } else {
          const passwordMatch = await bcrypt.compare(
            `${password}${config.jwt.pepper}`,
            user.password
          );
          if (passwordMatch) {
            const accessToken = generateAccessToken(user, request);
            return response.status(200).json({
              user: user,
              token: accessToken,
            });
          } else return response.status(401).json('Password Incorrect!');
        }
      } catch (error) {
        response.json(error);
      }
    } else {
      response.status(404).json('Data Not Found!');
    }
  };
  public static isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@sci\.cu\.edu\.eg$/;
    return emailRegex.test(email);
  };
  public static isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()-_+=])[A-Za-z0-9!@#$%^&*()-_+=]{8,}$/;
    return passwordRegex.test(password);
  };
}

export default AuthController;

function generateAccessToken(user: object, request: Request) {
  const i = 'SCI';
  const s = 'some@user.com';
  const a = request.headers['user-agent'];
  console.log(a);
  // Token signing options
  return jwt.sign({ user }, process.env.auth_private_key as string, {
    // algorithm: 'RS256', // Use RS256 for asymmetric key
    // issuer: i,
    // subject: s,
    // audience: a,
    expiresIn: '30d', // 30 days validity
  });
}
