const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const fM = require('./utils/msgs');
const {userJoin, getCurrentUser, userLeft, getRoomUsers} = require('./utils/user');
const { SocketAddress } = require('net');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//STATIC PATHS
app.use(express.static(path.join(__dirname, 'public')));

const admin = 'admin';

//SOCKET
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room})=>{
        const user=userJoin(socket.id,username,room);


        socket.join(user.room);

        //Welcome Message
        socket.emit('message', fM(admin, 'Welcome User')); 
        
        //Broadcast when a user connects
    
        socket.broadcast.to(user.room).emit('message', fM(admin,`${user.username} has joined the talk`));

        //Send User Info
        io.to(user.room).emit('roomUsers', {
            room : user.room,
            users : getRoomUsers(user.room)
        })

    })


    
    //Listen for chatmsg
    socket.on('chat', (msg)=>{
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message',fM(user.username,msg));
    });

    
    //Runs when client disconnects
    socket.on('disconnect', ()=>{
    const user= userLeft(socket.id);

        if(user){
            io.to(user.room).emit('message', fM(admin, `${user.username} has left`))
        }

        //Send User Info
        io.to(user.room).emit('roomUsers', {
            room : user.room,
            users : getRoomUsers(user.room)
        })

    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`); 
});