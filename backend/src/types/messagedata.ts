import {Document, ObjectId} from 'mongoose'

export interface Imessage extends Document{
    senderId:ObjectId,
    receiverId:ObjectId,
    text:string,
    image:string
}