var jwt = require('jsonwebtoken'),
    Promise = require('bluebird'),
    redis = require('redis'),
    client = require('utils/auth').client,
    privateKey = process.env.secret || 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc',
    server = require('../app'); // find a way to include the main file by requiring lets-chat instead of ../app



var validate = function (decodedToken, callback) {

    client.HGETALL(decodedToken.token,function(err,credentials) {

        if (!credentials || err) {
            return callback(err, false, credentials);
        }

        return callback(null, true, credentials)
    });

};

//TODO : this needs to make 'authorization' header as optional
//       if the header does not sends a json token, the response is given as 401
//       we need to simply return success if not authorization headers provided

var invalidate = function(decodedToken,callback) {

    client.EXISTS(decodedToken.token,function(err,credentials) {

        if (!credentials || err) {
            return callback(null,true,{});
        }

        client.del(decodedToken.token);
        callback(null,true,{});

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


    server.auth.strategy('discard-token', 'jwt', {
        key: privateKey,
        validateFunc: invalidate
    });

}

setup();


