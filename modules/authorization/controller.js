var Promise = require('bluebird'),
  	mongoose = Promise.promisifyAll(require('mongoose')),
  	User = mongoose.model('User');
    authUtils = require('utils/auth');

module.exports = {
	login : Login,
  logout : Logout
};

function Login(request,reply) {

	var user = reply.data,
		token = authUtils.createToken({'id' : user.id, 'scope' : user.type});

	reply.data = {
    'token' : token,
    'id' : user.id
  };

	reply.next();

}

function Logout(request,reply) {

  authUtils.clearToken(request.payload.token)
           .then(function() {
            reply.next();          
           })
           .catch(function(e) {
            reply.next(e);
           });

}