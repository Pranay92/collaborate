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

function One(request,reply) {
	
	if(reply.data && reply.data._id) {
		return reply.continue();
	}

	User.findByIdAsyc(request.params.id)
		.then(function(userExist){
			reply.data = userExist;
			reply.continue();
		})
		.catch(function(e) {
			reply.continue(e);
		});
}

function Add(request,reply) {
	reply.continue();
}

function Edit(request,reply) {
	reply.continue();
}

function Delete(request,reply) {
	reply.continue();
}

function Get(request,reply) {
	User.find({})
		.then(function(users) {
			reply.data = users;
			reply.continue();
		})
		.catch(function(e) {
			reply.continue({'msg' : 'Cannot fetch users','error' : e});
		});
}

function BulkAdd(request,reply) {
	reply.continue();
}

function BulkEdit(request,reply) {
	reply.continue();
}

function BulkDelete(request,reply) {
	reply.continue();
}
