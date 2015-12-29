var hapi = require('hapi');
require('dotenv').load();

// Create a server with a host, port, and options
var server = module.exports = new hapi.Server(require('config').mainServer.options);

server.connection(require('config').mainServer.app);

server.connection(require('config').chatServer);

require('database');

require('modules');

require('bootstrap');

server.start(function() {
	console.log('Server is up and running');
});

server.route({
  path  :'/*',
  method : 'OPTIONS',
  handler: function(request,reply) {
    reply();
  }
})