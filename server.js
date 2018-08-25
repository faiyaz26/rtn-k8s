// Setup basic express server
var os = require('os')
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var config = require('./config');

var app = express();
app.use(bodyParser.json()); // for parsing application/json


var server = require('http').createServer(app);
var io = require('socket.io')(server);

// for serving the static client files 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendfile(__dirname + 'public/index.html');
});


var notification_channel = 'notification_channel';

io.on('connection', function(socket) { // new user connected
    var data = {
        "server_hostname": os.hostname()
    }
    
    socket.emit("initial_data", data);
});

app.post('/notify', function(req, res){
    console.log("Got a request from client to notify");

    var dt = new Date();
    var utcDate = dt.toUTCString();

    var emit_data = {
        user_id: req.body.user_id,
        server_timestamp: utcDate,
    }
    io.sockets.emit(notification_channel,emit_data);

    res.send("done!");
});


server.listen(config.PORT, config.HOST, function() {
    console.log('Server listening at  %s:%d', config.HOST, config.PORT);
});

process.on('SIGTERM', function() {
    console.log('Received SIGTERM, shutting down server');
    server.close();
    process.exit(0);
});
  

