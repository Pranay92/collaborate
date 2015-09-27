var jwt = require('jsonwebtoken'),
    Promise = require('bluebird'),
    redis = require('redis'),
    client = require('utils/auth').client,
    privateKey = process.env.secret || 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc',
    server = require('../../app'); // find a way to include the main file by requiring lets-chat instead of ../app

var validate = function (decodedToken, callback) {

    client.HGETALL(decodedToken.token,function(err,credentials) {

        if (!credentials || err) {
            return callback(err, false, credentials);
        }

        return callback(null, true, credentials)
    });

};

function setup() {

    server.register(require('hapi-auth-jwt'), function (error) {

        server.auth.strategy('token', 'jwt', {
            key: privateKey,
            validateFunc: validate
        });

        console.log('Authorization strategy implemented');
    });

}

function initialize() {
  
  client.auth(process.env.REDIS_PASSWORD, function (err) {
    if (err) {
      console.log(err);    
    } 
  });

  client.on('connect', function() {
    console.log('Connected to Redis Server');
  }); 
}

setup();
initialize();



