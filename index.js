const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const db = require('./queries');

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); 
});

app.get('/chillout-place', (req, res) => {
    res.sendFile(__dirname + '/public/chatroom.html');
});

app.get('/nightlife', (req, res) => {
    res.sendFile(__dirname + '/public/chatroom.html');
});

app.get('/series-movies', (req, res) => {
    res.sendFile(__dirname + '/public/chatroom.html');
});

app.get('/sports', (req, res) => {
    res.sendFile(__dirname + '/public/chatroom.html');
});

// tech namespace
const tech = io.of('/tech');

tech.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);

        db.getChats.then( val => {
            //console.log(val);
        });

        tech.in(data.room).emit('message', `New user joined ${data.room} room!`);
    });

    socket.on('message', (data) => {
        console.log(`message ${data.msg}`);

        var message = {
            name: "User",
            room: data.room,
            text: data.msg
        };

        let insert = db.insertChats(message);
        tech.in(data.room).emit('message', data.msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');

        tech.emit('message', 'user disconnected');
    })
});