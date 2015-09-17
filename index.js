var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var data = JSON.parse((new Date()).getTime() + ": " + Math.floor(Math.random() * 6) + 1);

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('completeData', data);
});

function pushUpdate(new_data) {
    io.emit('dataUpdate', new_data);
}

setInterval(function() {pushUpdate(Math.floor(Math.random() * 6) + 1);}, 1000);


server.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
