import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router as expressRouter } from 'express'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

const router = expressRouter()
const prisma = new PrismaClient()
dotenv.config()
router.post(
    '/register',
    async (request : Request, response : Response, next) => {
        const hashedPassword = await bcrypt.hash(`${request.body.password}${process.env.pepper}`, 10)
        request.body.password = hashedPassword
        const user = await prisma.doctor.create({data:request.body})
        user.password = ''
        const accessToken = generateAccessToken( user , request)
        response.status(201).json({
            user: user,
            token: accessToken
        })
    })


    router.post(
        '/login',
        async (request : Request, response : any) => {
            if (request.body.email != null && request.body.password != null) {
                const user = await prisma.doctor.findUnique({
                    where: {
                        email: request.body.email
                    }
                })
                if (user == null){
                    return  response.status(404).json('User does not exist!')
                } else {
                    const passwordMatch = await bcrypt.compare(`${request.body.password}${process.env.pepper}`, user.password)
                    if (passwordMatch) {
                        const accessToken = generateAccessToken(user, request)
                        return response.status(200).json({
                            user: user,
                            token: accessToken
                        })
                    }
                    else return response.status(401).json('Password Incorrect!')
                }
            } else {
                response.status(404).json('data Not Found!')
            }
        })
    
    
export default router


function generateAccessToken(user: Object, request: Request) {
    //,{algorithm:"RS256"},{expiresIn: "10m"}
    const i = 'SCI'
    const s = 'some@user.com'
    const a = request.headers['user-agent']
    console.log(a)
    // Token signing options
    return jwt.sign({user}, process.env.auth_private_key as unknown as string, {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: '30d', // 30 days validity

    })
}

