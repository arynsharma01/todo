import { NextFunction, Request, Response } from "express";
import { z } from "zod";


const signupSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8),
    username : z.string().min(5),
    firstName : z.string().max(30),
    lastName : z.string().max(30).optional()
})
const loginSchema  = z.object({
    
    username : z.string().min(5),
    password : z.string().min(8),
})

async function signupValidate(req : Request,res:Response,next:NextFunction){
    
    console.log("ho");
    
    const result =  signupSchema.safeParse(req.body)
    if(!result.success){
        res.status(400).json({
            "message" : "invalid input"
        })
        return;

    }
    next()
}
async function signinValidate(req : Request,res:Response,next:NextFunction){
    const result =  loginSchema.safeParse(req.body)
    if(!result.success){
        res.status(400).json({
            "message" : "invalid input"
        })
        return;

    }
    next()
}

export { signupValidate , signinValidate }