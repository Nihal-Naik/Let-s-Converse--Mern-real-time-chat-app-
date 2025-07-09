import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods:["GET","POST"]
    }
})
const onlineUsers = new Map();

export function getReceiversocketid(userId:string):string{
    return onlineUsers.get(userId);
}

io.on("connection", (socket) => {
    const userId=socket.handshake.query.userId as string
    console.log("A user connected",socket.id)
    // console.log(userId)
    if(userId){
       onlineUsers.set(userId,socket.id)
    }
    io.emit("get_online_users",Array.from(onlineUsers.keys()))


    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        onlineUsers.delete(userId)
        io.emit("get_online_users",Array.from(onlineUsers.keys()))
    });

})
export { io, app, server }