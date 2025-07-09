import { Request,Response } from "express"
import users from "../model/users"
import message from "../model/message"
import { Iuser } from "../types/userdata"
import { log } from "console"
import cloudinary from "../lib/cloudinary.lib"
import { Imessage } from "../types/messagedata"
import { getReceiversocketid, io } from "../lib/socket.lib"



export const search=async(req:Request,res:Response)=>{
    try {
        const {email}=req.body
        const checkemail=await users.find({email:email}).select("-password")
        if(!checkemail){
            res.status(400).json({msg:"No results"})
            return
        }
        res.status(200).json({msg:checkemail})
    } catch (error) {
        console.log("Error in search controller",error);
        res.status(500).json({msg:"Internal server error"})
    }
}
export const getusers=async(req:Request,res:Response)=>{
    try {
        const loggedinuser=req.user._id
        const getuser=await users.find({_id:{$ne:loggedinuser}}).select("-password")
        res.status(200).json(getuser)
    }
     catch (error) {
        console.log("error in getusers controller",error);
        res.status(500).json({msg:"Internal server error"})
    }
}
export const getmessage=async(req:Request,res:Response)=>{
    try {
        const {_id:userTochatId}=req.params
        const myId=req.user._id

        const messages=await message.find({
            $or:[
                {senderId:myId,receiverId:userTochatId},
                {senderId:userTochatId,receiverId:myId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("error in getmessage controller",error);
        res.status(500).json({msg:"Internal server error"})
    }
}
export const sendmessage=async(req:Request,res:Response)=>{
    try {
        const { text, image } = req.body
        const { _id: receiverId } = req.params
        const senderId = req.user._id

        let imageurl
        if(!text){
            if(!image){
                res.status(406).json({msg:'Type something!'})
                return
            }
        }
        if (image) {
            let uploadresponse = await cloudinary.uploader.upload(image)
            imageurl = uploadresponse.secure_url
        }
        const newmessage: Imessage = new message({
            senderId,
            receiverId,
            text,
            image: imageurl
        })

        await newmessage.save()

        const receiversocketid=getReceiversocketid(receiverId)
        if(receiverId){
            io.to(receiversocketid).emit("newMessage",newmessage)
        }
 
        res.status(200).json(newmessage)
    } catch (error) {
        console.log("error in send message controller",error);
        res.status(500).json({msg:"Internal server error"})
        
    }
}

