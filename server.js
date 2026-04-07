require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const DBconnection=require('./db');
const app = express();
const socket=require('socket.io');
const port = process.env.PORT ;
const appUrl = process.env.CORS_ORIGIN ;
const employeesRoutes=require("./routes/employeeRoutes");
const messageRoutes=require("./routes/messageRoutes");

const io=socket(server,{
  cors:{
    origin:appUrl,
    methods:["GET","POST"],
    credentials:true
  }
})

const onlineUsers=new Map();

io.on("connection",(socket)=>{
  console.log("A user connected: " + socket.id);
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id);
  });
  socket.on("send-msg",(data)=>{
    const sendUserSocket=onlineUsers.get(data.to);  
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-receive",data.message);
    } 
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [appUrl],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

DBconnection();
app.use("/employees", employeesRoutes);
app.use("/messages", messageRoutes);

app.get('/get', (req, res) => {
  res.send('Hello World! Server is running');
});
app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`);
});