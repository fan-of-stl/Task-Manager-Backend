const express = require('express')
const http = require("http")
const socketIo = require('socket.io')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')

const app = express()
const server = http.createServer(app)
const  io = socketIo(server)

app.use(express.json())
app.use(cors())



const PORT = process.env.PORT || 5000

server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})