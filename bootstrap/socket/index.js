var listener = require('../../app').select('chat').listener,
    socketUtils = require('../../utils/socket'),
    io = require('socket.io')(listener);


function setup() {
    socketUtils.initialize(io);
}

setup();




