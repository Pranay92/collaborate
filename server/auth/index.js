var jwt = require('jsonwebtoken'),
    Promise = require('bluebird'),
    redis = require('redis'),
    client = Promise.promisifyAll(redis.createClient()),
    privateKey = process.env.secret || 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';

var validate = function (decodedToken, callback) {

    var error;

    client.hgetall(decodedToken.token,function(err,credentials) {
        console.log(credentials);

        if (!credentials) {
            return callback(error, false, credentials);
        }

        return callback(error, true, credentials)
    });

};


module.exports = function(server) {
    server.register(require('hapi-auth-jwt'), function (error) {

        server.auth.strategy('token', 'jwt', {
            key: privateKey,
            validateFunc: validate
        });

        console.log('Authorization strategy implemented');
    });
}
