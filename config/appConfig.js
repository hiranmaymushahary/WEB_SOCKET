const express = require('express');

const socketIo = require('socket.io');

const http = require('http');

const cors = require('cors');

const app = express();

const server = http.createServer(app);

const io = socketIo(server , {
    cors : {
        origin : "*",
        methods : ["GET" , "POST"]

    }
})

app.use(cors());
app.use(express.json());

module.exports = {
    app,
    server, 
    io,
    
}