var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
    whiteboard.on('draw', function(start, finish, color){
      socket.emit('drawing', {start: start, finish: finish, color: color});
   });
});



socket.on('data', function(data){
  console.log('getting data', data.start, data.finish, data.color);
  whiteboard.draw(data.start, data.finish, data.color);
});

// console.log(io);
