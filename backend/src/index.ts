import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { PORT } from './constants/env'
import { mongo } from './lib/db.lib'
import authroutes from './routes/auth.routes'
import messageroutes from './routes/message.routes'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './lib/socket.lib'

const port=PORT||4000

app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieparser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api/auth',authroutes)
app.use('/api/message',messageroutes)

server.listen(port,async()=>{
    console.log("App listening on port ",port);
    await mongo()
})
