var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var data = [];

// function addData(new_data) {
//     data.push(new_data);
// }

function pushUpdate(new_data) {
    //console.log("sent" + JSON.stringify(new_data));
    io.emit('dataUpdate', new_data);
}

// setTimeout(function() {addData({ "date":(new Date()).getTime()+1000, "data":(Math.floor(Math.random() * 6) + 1) });}, 1000);
// setTimeout(function() {addData({ "date":(new Date()).getTime()+2000, "data":(Math.floor(Math.random() * 6) + 1) });}, 1000);
// setTimeout(function() {addData({ "date":(new Date()).getTime()+3000, "data":(Math.floor(Math.random() * 6) + 1) });}, 1000);
// setTimeout(function() {addData({ "date":(new Date()).getTime()+4000, "data":(Math.floor(Math.random() * 6) + 1) });}, 1000);
// setInterval(function() {pushUpdate({ "date":(new Date()).getTime(), "data":(Math.floor(Math.random() * 6) + 1) });}, 1000);
setInterval(function() {pushUpdate({ "date":(new Date()).getTime(), "data":(Math.floor(Math.random() * 100) + 1) });}, 1000);


io.on('connection', function(socket){
  console.log('a user connected');
  // io.emit('completeData', data);
});

server.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
