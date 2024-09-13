import express from 'express'

import bodyParser from 'body-parser';
import {  Request, Response } from "express";
import { signinValidate,signupValidate } from './middlewares/input';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'




const pass:string = "supersecpass"
const prisma = new PrismaClient();


const app = express.Router();``
app.use(bodyParser.json())

app.post('/signup',signupValidate, async (req:Request,res:Response)=>{

    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    let result = await prisma.user.findFirst({
        where:{
            OR :[
                {username :username},
                {email :email}
            ]
        }
    })
    if(result!=null){
        res.status(400).json({
            "message": "username/email already exists "
        })
        return
    }
    
    const createUser =  await prisma.user.create({
        data :{
            email : email,
            username:username,
            password: password,
            firstName :firstName,
            lastName : lastName
        }
    })
    
    
    const token:string = jwt.sign(username,pass)
    res.status(200).json({
        "message" : "created successfully",
        "token" : token
    })



})
app.post('/signin',signinValidate, async(req:Request,res:Response)=>{
    const username = req.body.username
    const password = req.body.password
    const result = await prisma.user.findFirst({
        where : {
            AND :[
                {username : username },
                {password : password }
            ]
        }
    })
    if(result== null ){
        res.status(411).json({
            "message ": "invalid username or wrong password "
        })
        return;

    }
    const token: string = jwt.sign(username,pass)
    res.status(200).json({
        "message ": "successfull",
        "token" : token
    })
})
app.get('/try',(req,res)=>{
    res.json({
        "message" : "worli"
    })
})
export {app as user }