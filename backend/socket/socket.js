import { Server } from "socket.io";
import http from "http";

import express from "express";

const app = express();

//build a socket server on top of express server

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
}); //gives new server

//get recievers socket id

export const getRecieverSocketId = (recieverId) => {
  return userSocketMap[recieverId]; //this object will give socket id
};

//array for online users
const userSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  //get uerId from query
  const userId = socket.handshake.query.userId;

  //set userid into object of online users

  if (userId !== "undefined") userSocketMap[userId] = socket.id;

  // io.emit() is used to send events all the connectes clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); //here Object.keys(obj) send an array of keys of object

  //Socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconncetd", socket.id);

    //delete id when disconnect
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
