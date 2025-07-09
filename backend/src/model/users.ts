import { model, Schema } from 'mongoose'
import {Iuser} from '../types/userdata'

const UserSchema: Schema = new Schema<Iuser>({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique:true,
        required: true
    },

    password: {
        type: String,
        required: true,
        length:8
    },
    avatar:{
        type:String,
    },
    contacts:{
        type:[String],
    }

}, { timestamps: true })


export default model<Iuser>('user', UserSchema)