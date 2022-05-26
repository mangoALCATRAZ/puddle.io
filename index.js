const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) =>{
    console.log('a user connected!');

    socket.on('ripple data', (data) => {
        console.log('ripple! ' + data.x + "% " + data.y + "% Red:" + data.red + " Green: " + data.green + " Blue: " + data.blue);

        socket.broadcast.emit('ripple data', data);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

