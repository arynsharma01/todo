import { error } from "console";
import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import { string } from "zod";

const pass:string = "supersecpass"
export default async function tokenIsValid(req:any,res:Response,next:NextFunction) {
    const token = req.headers.token ;
    

    
    
    
    
    if(token == null){
        res.status(401).json({
            "message" : "unauthorized"
        })
        return
    }
    
    try{
        
        const decoded = jwt.verify(token as string, pass) as { username: string }; 
       
        req.username = decoded.username; // Attach the username to the req object
        
        
        next()
        
    }
    catch(e){
        res.status(401).json({
            "message" : "user does not exists"
        })
        return 
    }
   
}