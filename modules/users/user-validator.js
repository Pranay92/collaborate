var Promise = require('bluebird'),
	mongoose = Promise.promisifyAll(require('mongoose')),
	User = mongoose.model('User'),
	joi = require('joi'),
	pattern = require('../../utils/pattern');

module.exports = {

	one : One,
	add : Add,
	edit : Edit,
	delete : Delete,
	get : Get,
	bulkAdd : BulkAdd,
	bulkEdit : BulkEdit,
	bulkDelete : BulkDelete,

	validateReqOne 	: ValidateReqOne,
	validateReqAdd 	: ValidateReqAdd,
	validateReqEdit : ValidateReqEdit,
	validateReqDelete : ValidateReqDelete,
	validateReqGet : ValidateReqGet,
	validateReqBulkAdd : ValidateReqBulkAdd,
	validateReqBulkEdit : ValidateReqBulkEdit,
	validateReqBulkDelete : ValidateReqBulkDelete,

};

function One(request,reply) {
	User.findByIdAsync(request.params.id)
		.then(function(userExist){
			
			if(!userExist) {
				return reply.continue('User not found');
			}

			reply.data = userExist;
			reply.continue();
		})
		.catch(function(e) {
			reply.continue(e);
		})
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
	reply.continue();
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




function ValidateReqOne(request,reply) {

	return {
		params : {
			id : joi.string().regex(pattern.objectId)
		}
	};

}

function ValidateReqAdd() {

	return {

	};
}

function ValidateReqEdit() {

	return {

	};
}

function ValidateReqDelete() {

	return {

	};
}

function ValidateReqGet() {

	return {

	};
}

function ValidateReqBulkAdd() {

	return {

	};
}

function ValidateReqBulkEdit() {

	return {

	};
}

function ValidateReqBulkDelete() {

	return {

	};
}