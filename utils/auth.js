var Promise = require('bluebird'),
    redis = require('redis'),
    client = Promise.promisifyAll(redis.createClient()),
    jwt = require('jsonwebtoken'),
    privateKey = process.env.secret || 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';


module.exports = {
  createToken : createToken,
  clearToken : clearToken
};


function createToken(userObj) {
  
  var authObj = {'userId' : userObj.id, scope : userObj.scope.toLowerCase()},
     token1 = jwt.sign(authObj, privateKey),
     token2;
  
  authObj.token = token1;
  token2 = jwt.sign(authObj, privateKey);
  client.HMSET(token1,authObj);
  return token2;
}

function clearToken() {

}