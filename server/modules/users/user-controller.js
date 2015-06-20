var Promise = require('bluebird'),
	mongoose = Promise.promisifyAll(require('mongoose')),
	User = mongoose.model('User');

module.exports = {

	one : One,
	add : Add,
	edit : Edit,
	delete : Delete,
	get : Get,
	bulkAdd : BulkAdd,
	bulkEdit : BulkEdit,
	bulkDelete : BulkDelete
	
};

function One(request,reply,next) {
	
	if(reply.data) {
		return next();
	}

	User.findByIdAsyc(request.params.id)
		.then(function(userExist){
			reply.data = userExist;
			next();
		})
		.catch(function(e) {
			next(e);
		});
}

function Add(request,reply,next) {
	next();
}

function Edit(request,reply,next) {
	next();
}

function Delete(request,reply,next) {
	next();
}

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

function BulkAdd(request,reply,next) {
	next();
}

function BulkEdit(request,reply,next) {
	next();
}

function BulkDelete(request,reply,next) {
	next();
}
