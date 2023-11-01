const express = require('express')
const http = require("http")
// const socketIo = require('socket.io')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')

const app = express()
const server = http.createServer(app)
// const  io = socketIo(server)

const {MONGO_URI} = require('./config/database')
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

require('./config/passport')(passport)

app.use(express.json())
app.use(cors())

//basic routes
app.get('/', (req, res)=> {
    res.send('Hello, thanks for joining.')
})

//Routes
const userRoutes = require('./routes/userRoutes')
app.use('/task-manager/users', userRoutes)


const PORT = process.env.PORT || 5000

server.listen(PORT, ()=>{
    console.log(`Listening on port http://localhost:${PORT}`);
})