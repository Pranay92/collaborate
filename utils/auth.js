var Promise = require('bluebird'),
    redis = require('redis'),
    client = Promise.promisifyAll(redis.createClient()),
    jwt = require('jsonwebtoken'),
    privateKey = process.env.secret || 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';

module.exports = {
  createToken : createToken,
  clearToken : clearToken,
  client : client
};

function createToken(userObj) {
  
  var authObj = {'id' : userObj.id, scope : userObj.scope.toLowerCase()},
     token1 = jwt.sign(authObj, privateKey),
     token2;
  
  authObj.token = token1;
  token2 = jwt.sign(authObj, privateKey);
  client.HMSET(token1,authObj);
  return token2;
}

function clearToken(token) {
  
  return new Promise(function(resolve, reject) {

    jwt.verify(token,privateKey,function(err,decoded) {
    
      if(!err) {
        client.del(decoded.token);
      }

      resolve();

    });

  });

}