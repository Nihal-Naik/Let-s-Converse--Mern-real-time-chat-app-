import mongoose, { model, Schema } from "mongoose";
import {Imessage} from '../types/messagedata'

const MessageSchema: Schema = new Schema<Imessage>({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true
    },

    text: {
        type: String
    },

    image: {
        type: String,
    },

}, { timestamps: true })


export default model<Imessage>('message', MessageSchema)