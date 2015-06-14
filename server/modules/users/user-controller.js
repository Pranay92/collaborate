var mongoose = require('mongoose');
	User = mongoose.model('User');

module.exports = {
	get : Get
};


function Get(request,reply,next) {
	User.find({})
		.then(function(users) {
			reply.data = users;
			next();
		})
		.catch(function(e) {
			next({'msg' : 'Cannot fetch users','error' : e});
		});
}