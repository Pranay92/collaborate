var jwt = require('jsonwebtoken'),
    privateKey = process.env.secret || 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';

// Use this token to build your request with the 'Authorization' header.  
// Ex:
//     Authorization: Bearer <token>
//var token = jwt.sign({ accountId: 123 }, privateKey);

var accounts = {
    '1' : {
        'name' : 'Pranay Dubey',
        'type' : 'admin'
    }
}

var validate = function (decodedToken, callback) {

    var error,
        credentials = accounts[decodedToken.userId];
    console.log(decodedToken,decodedToken.userId,accounts);

    if (!credentials) {
        return callback(error, false, credentials);
    }

    return callback(error, true, credentials)
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
