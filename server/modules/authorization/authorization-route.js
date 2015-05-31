var Promise = require('bluebird'),
  	boom = require('boom'),
  	mongoose = Promise.promisifyAll(require('mongoose')),
  	User = mongoose.model('User');
  	jwt = require('jsonwebtoken'),
    Promise = require('bluebird'),
    redis = require('redis'),
    client = Promise.promisifyAll(redis.createClient()),
    privateKey = process.env.secret || 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';

module.exports = {
	post : {
		method : 'POST',
		path : '/login',
		config : {
			handler : function(request,reply) {
				var authObj = {'userId' : '1', scope : 'admin'};
				var token1 = jwt.sign(authObj, privateKey);
				authObj.token = token1;
				var token2 = jwt.sign(authObj, privateKey);

				client.HMSET(token1,authObj);
				reply(token2);
			}
		}
	}
}