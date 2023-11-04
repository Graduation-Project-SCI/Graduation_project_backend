import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router as expressRouter } from 'express'
import { Request, Response } from 'express'
import dotenv from 'dotenv'

const router = expressRouter()

router.post(
    '/createUser',
    async (request : Request, response : Response, next) => {
        const hashedPassword = await bcrypt.hash(request.body.password, 10)
        request.body.password = hashedPassword
        request.body.guard = 'Doctor'
        const user = await DoctorModel.query().insert(request.body)
        const accessToken = generateAccessToken({ user: user.id }, request)
        await user.$query().update({ device_token: accessToken })
        response.status(201).json({
            user: user,
            token: accessToken,
            email: request.body.email
        })
    })


    router.post(
        '/login',
        async (request : Request, response : any) => {
            if (request.body.username != null && request.body.password != null) {
                const user = await DoctorModel.query()
                    .where('guard', 'Doctor')
                    .where('users.email', request.body.email)
                    .first()
                if (user == null){
                    return  response.status(404).json('User does not exist!')
                } else {
                    response.status(401).json('Password Incorrect!')
                }
            } else {
                response.status(404).json('data Not Found!')
            }
        })
    
    
export default router


function generateAccessToken(username: any, request: any) {
    //,{algorithm:"RS256"},{expiresIn: "10m"}
    const i = 'SCI'
    const s = 'some@user.com'
    const a = request.headers['user-agent']
    console.log(a)
    // Token signing options
    return jwt.sign(username, dotenv.auth_private_key as string, {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: '30d', // 30 days validity
        algorithm: 'RS256'
    })
}

