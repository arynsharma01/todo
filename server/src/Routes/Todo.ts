import express, { Request, Response } from 'express'
import tokenIsValid from './middlewares/tokenCheck';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
const app = express.Router();
app.use(bodyParser.json())

app.post('/add', tokenIsValid, async (req: any, res: Response) => {
    const username: string = req.username;
    const prisma = new PrismaClient()
    try {


        const result = await prisma.user.findFirst({
            where: {
                username: username
            }
        })

        if (result == null) {
            res.status(411).json({
                "message": "user not found sign up "
            })
            return
        }
        const userId = result.id
        const title = req.body.title
        const description = req.body.description
        const result2 = await prisma.todo.create({
            data: {
                title: title,
                description: description,
                userId: userId
            }
        })
        res.status(200).json({
            "message " :   "done successfully "
        })
        
    }
    catch (e) {
        res.status(500).json({
            "message " :   "server side error try again later "
        })
        return ; 
    }


})

export { app as todoRouter }