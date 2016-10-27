var path = require('path');
var socketio = require('socket.io');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

server.on('request', app);
var io = socketio(server); // an event emitter

io.on('connection', function (socket) { // io represents  full socket server, socket represents a single socket that is connected to us
    /* This function receives the newly connected socket.
       This function will be called for EACH browser that connects to our server. */
    console.log('A new client has connected!');
    console.log(socket.id);
    console.log('server.js');

    socket.on('drawing', function(data){
      socket.broadcast.emit('data', data);
      console.log(data);
    });

    socket.on('disconnect', function () {
    console.log(':( disconnected');

   });
});


var port = process.env.PORT || 5000;
server.listen(port, function () {
    console.log('The server is listening on port ' + port + "!");
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});



