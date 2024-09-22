import express from 'express';
import {createServer} from 'node:http';
import {Server} from "socket.io";


const PORT = process.env.PORT || 4000;


const app = express();
const server = createServer(app);

const io = new Server(server,{
  connectionStateRecovery:{},
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})


app.get('/', (req, res) => {
 console.log('server is running ye yes yes')
});

io.on('connection',  (socket)=>{
  socket.on('join', (username)=>{
    socket.username = username;
    io.emit('message', {
      type: 'notification',
      text: `${username} has joined the chat`
    })
  })

  socket.on('sendMessage', (message)=>{
      io.emit('message',{
        type:'chat',
        username: socket.username,
        text: message,
      })
  })


  socket.on('disconnect-me',(reason)=>{

socket.on('disconnect',()=>{

})
    io.emit('message',{
      type: 'leave',
      text: `user has left the chat`
    })

  })
})



server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})
