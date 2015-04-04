var hapi = require('hapi');

// Create a server with a host, port, and options
var server = new hapi.Server();
server.connection({'port' : 3000})


require('./modules/route.js')(server);

server.start(function() {
	console.log('Server listennig on port ' + server.info.uri);
})