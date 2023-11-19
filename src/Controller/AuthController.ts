import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AuthController {
  public static createUser = async (
    request: Request,
    response: Response
  ) => {
    try {
      console.log(request.body);

      const hashedPassword = await bcrypt.hash(
        `${request.body.password}${process.env.PEPPER}`,
        10
      );
      request.body.password = hashedPassword;
      const user = await prisma.professor.create({ data: request.body });
      const accessToken = generateAccessToken(user, request);

      response.status(201).json({
        user: user,
        token: accessToken,
      });
    } catch (error) {
      response.json(error);
    }
  };

  public static login = async (request: Request, response: Response) => {
    if (request.body.email != null && request.body.password != null) {
      const user = await prisma.professor.findUnique({
        where: {
          email: request.body.email,
        },
      });
      if (user == null) {
        return response.status(404).json('User does not exist!');
      } else {
        const passwordMatch = await bcrypt.compare(
          `${request.body.password}${process.env.PEPPER}`,
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
    } else {
      response.status(404).json('Data Not Found!');
    }
  };
}

export default AuthController;

function generateAccessToken(user: object, request: Request) {
  const i = 'SCI';
  const s = 'some@user.com';
  const a = request.headers['user-agent'];
  console.log(a);
  // Token signing options
  return jwt.sign({ user }, process.env.AUTH_PRIVATE_KEY as string, {
    algorithm: 'RS256', // Use RS256 for asymmetric key
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: '30d', // 30 days validity
  });
}
