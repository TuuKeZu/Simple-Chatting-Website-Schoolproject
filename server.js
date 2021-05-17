const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const IO = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

var UserCount = 0;

//pakettejen hallinta¨
IO.on('connection', socket => {
    console.log("[liittymispyyntö saapunut]");
    IO.emit('message', 'Henkilö liittyi keskusteluun');
    UserCount += 1;
    IO.emit('user-count', {data: UserCount});

    socket.on('disconnect', socket => {
        console.log("[käyttäjä poistunut]");
        IO.emit('message', 'Henkilö poistui keskustelusta');
        UserCount -= 1;
        IO.emit('user-count', {data: UserCount});
    });

    socket.on('message', function(data){
        console.log("Viesti vastaanotettu : "+data);
        IO.emit('receiveMessage', data);
    });
});

const port = 52400 || process.env.port;
server.listen(port, ()=> console.log("Käynnistettiin serveri portissa : "+port));