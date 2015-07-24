var Promise = require('bluebird'),
  	mongoose = Promise.promisifyAll(require('mongoose')),
  	User = mongoose.model('User');
    authUtils = require('utils/auth');

module.exports = {
	login : Login
};

function Login(request,reply) {

	var user = reply.data,
		token = authUtils.createToken({'id' : user._id, 'scope' : user.type});

	reply.data = token;
	reply.continue();

}