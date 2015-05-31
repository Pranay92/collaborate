var hapi = require('hapi');
require('dotenv').load();

// Create a server with a host, port, and options
var server = new hapi.Server();

server.connection({'port' : 3000})

require('./database/config.js');

require('./modules/route.js')(server);

require('./auth')(server);

server.start(function() {
	console.log('Server listennig on port ' + server.info.uri);
})