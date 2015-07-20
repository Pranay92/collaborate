var Promise = require('bluebird'),
	mongoose = Promise.promisifyAll(require('mongoose')),
	Group = mongoose.model('Group');

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

	Group.findByIdAsyc(request.params.id)
		.then(function(groupExist){
			reply.data = groupExist;
			reply.continue();
		})
		.catch(function(e) {
			reply.continue(e);
		});
}

function Add(request,reply) {
	
	var group = new Group(request.payload);
	
	group.saveAsync()
		.then(function() {
			reply.continue();
		})
		.catch(function(e) {
			reply.continue(e);
		});
}

function Edit(request,reply) {
	reply.continue();
}

function Delete(request,reply) {
	reply.continue();
}

function Get(request,reply) {
	Group.find({})
		.then(function(groups) {
			reply.data = groups;
			reply.continue();
		})
		.catch(function(e) {
			reply.continue({'msg' : 'Cannot fetch groups','error' : e});
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
