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

function One(request,reply,data) {
	
	if(reply.data) {
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

function Add(request,reply,data) {
	reply.continue();
}

function Edit(request,reply,data) {
	reply.continue();
}

function Delete(request,reply,data) {
	reply.continue();
}

function Get(request,reply,data) {
	User.find({})
		.then(function(users) {
			reply.data = users;
			reply.continue();
		})
		.catch(function(e) {
			reply.continue({'msg' : 'Cannot fetch users','error' : e});
		});
}

function BulkAdd(request,reply,data) {
	reply.continue();
}

function BulkEdit(request,reply,data) {
	reply.continue();
}

function BulkDelete(request,reply,data) {
	reply.continue();
}
