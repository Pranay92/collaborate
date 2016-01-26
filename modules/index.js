var globby = require('globby'),
  server = require('../app');

function SetupRoutes() {
  var routes,
    len;
  
  globby(['modules/**/route.js'],function(err,paths) {
    len = paths.length;
    while(len--) {
      paths[len] = processPath(paths[len]);
      routes = require(paths[len]);
      walkThroughRoutes(routes,server);
    }
  });
}

function apiDocs(server) {
  var pack = require('./package');
  var inert = require('inert');
  var vision = require('vision');
  var hapiSwagger = require('hapi-swagger');
  var options = {
    info: {
      'title': 'Collaborate API Documentation',
      'version': pack.version,
    }
  };

  server.register([
    inert,
    vision,
    {
      'register': hapiSwagger,
      'options': options
    }], function (err) {
      if (err) {
          console.log(err);
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
    routes[routeName].config.tags = ['api'];
    server.route(routes[routeName]);
  });
}

SetupRoutes();
apiDocs(server);