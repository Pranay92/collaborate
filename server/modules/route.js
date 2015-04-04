var globby = require('globby');

module.exports = function(server) {
	var routes,
		len;
	
	globby(['**/*-route.js'],function(err,paths) {
		len = paths.length;
		while(len--) {
			paths[len] = processPath(paths[len]);
			routes = require(paths[len]);
			walkThroughRoutes(routes,server);
		}
	});
}

function processPath(path) {
	var pathArr = path.split('/'),
		processedPath;

	pathArr.splice(0,1);
	pathArr = pathArr.join('/');
	processedPath = './' + pathArr;
	return processedPath;
}


function walkThroughRoutes(routes,server) {
	Object.keys(routes).forEach(function(routeName) {
		server.route(routes[routeName]);
	});
}