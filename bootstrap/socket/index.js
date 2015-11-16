var listener = require('../../app').select('chat').listener,
    socketUtils = require('../../utils/socket'),
    io = require('socket.io')(listener);


function setup() {
  io.on('connection',function(socket) {
    socketUtils.initialize(socket);
  });
}

setup();