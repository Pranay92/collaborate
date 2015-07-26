var Promise = require('bluebird'),
    redis = require('redis'),
    client = Promise.promisifyAll(redis.createClient(process.env.REDIS_PORT,process.env.REDIS_HOST, {no_ready_check: true})),
    jwt = require('jsonwebtoken'),
    privateKey = process.env.secret || 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';

module.exports = {
  createToken : createToken,
  clearToken : clearToken,
  client : client
};

client.auth(process.env.REDIS_PASSWORD, function (err) {
  if (err) {
    console.log(err);    
  } 
});

client.on('connect', function() {
  console.log('Connected to Redis Server');
});

function createToken(userObj) {
  
  var authObj = {'userId' : userObj.id, scope : userObj.scope.toLowerCase()},
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
    
      if(err) {
        return;
      }

      client.del(decoded.coreToken);

      resolve();

    });

  });

}