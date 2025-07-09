import { Document } from "mongoose";

export interface Iuser extends Document{
    name:string
    email:string
    password:string
    avatar?:string
    contacts:Array<String>
}