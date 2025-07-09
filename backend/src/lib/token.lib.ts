import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { SECRET } from '../constants/env';
import { Types,ObjectId } from "mongoose"


export const generatetoken=(_id: ObjectId,res:Response)=>{

    const token=jwt.sign({_id},SECRET,{expiresIn:'7d'})

    res.cookie("chatapp",token,{
        httpOnly:true,
        secure:false,
        maxAge:604800000,
        sameSite:"strict",
    })
}