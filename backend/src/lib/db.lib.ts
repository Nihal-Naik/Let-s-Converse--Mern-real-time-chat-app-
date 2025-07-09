import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";


export const mongo=async()=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("DB connected succesfully");
        
    } catch (error) {
        console.log("Error in the db connection",error);
        process.exit(1)
    }
}