var Promise = require('bluebird'),
  	boom = require('boom'),
  	mongoose = Promise.promisifyAll(require('mongoose')),
  	User = mongoose.model('User');

module.exports = {
	get : {
		method : 'GET',
		path : '/users',
		config : {
			'handler' : function(request,reply) {
				User.find({})
					.then(reply)
					.catch(function(e) {
						reply(boom.badData({'msg' : 'Cannot fetch users','error' : e}));
					});
			}
		}
	}
}