const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
// const socketio =require('socket.io')
const { Server } = require("socket.io");
const Filter = require('bad-words')
const filter = new Filter()


const publicPathDirectory = path.join(__dirname, '../public')
app.use(express.static(publicPathDirectory))
const server = http.createServer(app)
const io = new Server(server);
// const io =socketio(server)
const count =1
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('welcome user','welcome')
  socket.broadcast.emit('welcome user','a user has joined roomchat')
  // socket.emit("sendback client",()=>{
  //   console.log('welcome ')
  // })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('send messages fr client to sv',(text,callback)=>{
    if(filter.isProfane(text)){
       return callback('no typing bad words')
    }
    io.emit('sendback client',text,)
    callback()
  })
  socket.on('send location fr cli to sv',({latitude,longitude})=>{
    const linklocation = `https://www.google.com/maps/@${latitude},${longitude},16z`
    io.emit('send link to cli',linklocation)
  })
});

const port = 4567
server.listen(port, () => {
  console.log('app run on localhost 4567')
})