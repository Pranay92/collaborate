var Promise = require('bluebird'),
  	boom = require('boom'),
  	mongoose = Promise.promisifyAll(require('mongoose')),
  	User = mongoose.model('User');
  	jwt = require('jsonwebtoken'),
    privateKey = process.env.secret || 'BbZJjyoXAdr8BUZuiKKARWimKfrSmQ6fv8kZ7OFfc';

module.exports = {
	post : {
		method : 'POST',
		path : '/login',
		config : {
			handler : function(request,reply) {
				var token = jwt.sign({ userId: '1' }, privateKey);
				reply(token);
			}
		}
	}
}