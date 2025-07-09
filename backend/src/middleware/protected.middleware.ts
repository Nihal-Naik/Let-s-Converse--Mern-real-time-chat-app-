import { Request,Response,NextFunction } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { SECRET } from "../constants/env"
import users from "../model/users"

export const protectedroute=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const cookie=req.cookies.chatapp
        if(!cookie){
            res.status(400).json({msg:"Unauthorized"})
            return
        }
        const decoded=jwt.verify(cookie,SECRET) as JwtPayload
        if(!decoded){
            res.status(400).json({msg:"Unauthorized"})
            return
        }
        const checkuser=await users.findById(decoded._id).select("-password")
        if(!checkuser){
            res.status(400).json({msg:"User not found"})
            return
        }
        req.user=checkuser
        next()
    } catch (error) {
        console.log("error in protected controller",error);
        res.status(500).json({messgae:"Internal server error"})
    }
}