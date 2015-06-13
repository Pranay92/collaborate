var hapi = require('hapi');
require('dotenv').load();

// Create a server with a host, port, and options
var server = module.exports = new hapi.Server();

server.connection({'port' : 3000})

require('./database/config');

require('./modules/index');

require('./auth');

require('./database/startup');

server.start(function() {
	console.log('Server listennig on port ' + server.info.uri);
})