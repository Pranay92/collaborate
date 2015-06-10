var Promise = require('bluebird'),
  	boom = require('boom'),
  	mongoose = Promise.promisifyAll(require('mongoose')),
  	User = mongoose.model('User');
  	jwt = require('jsonwebtoken'),
    Promise = require('bluebird'),
    redis = require('redis'),
    client = Promise.promisifyAll(redis.createClient()),
    privateKey = process.env.secret || 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc',
    authUtils = require('../../utils/auth');

module.exports = {
	post : {
		method : 'POST',
		path : '/login',
		config : {
			handler : function(request,reply) {
				var token = authUtils.createToken({userId : 1, scope : 'admin'});
				reply(token);
			}
		}
	}
}