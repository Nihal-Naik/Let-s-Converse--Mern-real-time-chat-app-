import { Response,Request } from "express"
import users from "../model/users"
import bcrypt from 'bcrypt'
import { Iuser } from "../types/userdata"
import { generatetoken } from "../lib/token.lib"
import { ObjectId, Types } from "mongoose"
import cloudinary from "../lib/cloudinary.lib"


export const signup=async(req:Request,res:Response)=>{
    try {
        const { name, email, password } = req.body
        const avatar=""
        const emailexists = await users.findOne({ email })
        if (emailexists) {
            res.status(409).json({ msg: "user exists!" })
            return
        }
        const salt: number = 10
        const hashedpassword = await bcrypt.hash(password, salt)

        const newuser:Iuser = new users({ name, password: hashedpassword, email,avatar })
        await newuser.save()

        res.status(200).json({msg:"Signup successfull!"})
    } catch (error) {
        res.status(500).json({msg:"Signup error"})
        console.log("error in signup controller",error);
        
    }
}

export const login=async(req:Request,res:Response)=>{
    try {
        const {email,password}=req.body

        const user=await users.findOne({email})
        if(!user){
            res.status(400).json({msg:"Invalid credentials!"})
            return
        }
        const match=await bcrypt.compare(password,user.password)

        
        if(!match){
            res.status(400).json({msg:"Invalid credentials!"})
            return
        }
        
        generatetoken(user._id as ObjectId,res)
        res.status(200).json({msg:"Logged in successfully!"})
    } catch (error) {
        res.status(500).json({msg:"Login error"})
    }
}
export const logout=(req:Request,res:Response)=>{
    try {
        res.cookie("chatapp","",{
            maxAge:0
        })
        res.status(200).json({msg:"Logged out successfully"})
    } catch (error) {
        console.log("Logout error ",error)
        res.status(500).json({msg:"Internal server error"})
    }
}
export const checkauth=(req:Request,res:Response)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in checkauth controller",error);
        res.status(500).json({message:"Internal server error"})
    }
}
export const updateprofile=async(req:Request,res:Response)=>{
    try {
        const {avatar}=req.body
        
        const userid=req.user._id
        if(!avatar){
            res.status(400).json({msg:"Avatar not provided"})
            return
        }
        const uploadpic=await cloudinary.uploader.upload(avatar)
        const updatedpic=await users.findByIdAndUpdate(userid,{avatar:uploadpic.secure_url},{new:true}).select("-password")

        res.status(200).json({updatedpic,msg:"Profile picture updated successfully!"})

    } catch (error) {
        console.log("Error in updateprofile controller",error);
        res.status(500).json({msg:"Internal server error"})
    }
}