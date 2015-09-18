var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var d1 = { "date":(new Date()).getTime(), "data":(Math.floor(Math.random() * 6) + 1) }
var d2 = { "date":(new Date()).getTime(), "data":(Math.floor(Math.random() * 6) + 1) }
var d3 = { "date":(new Date()).getTime(), "data":(Math.floor(Math.random() * 6) + 1) }
var d4 = { "date":(new Date()).getTime(), "data":(Math.floor(Math.random() * 6) + 1) }
var data = [];
data.push(d1);
data.push(d2);
data.push(d3);
data.push(d4);

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('completeData', data);
});

function pushUpdate(new_data) {
    io.emit('dataUpdate', new_data);
}

setInterval(function() {pushUpdate({ "date":(new Date()).getTime(), "data":(Math.floor(Math.random() * 6) + 1) });}, 1000);


server.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
