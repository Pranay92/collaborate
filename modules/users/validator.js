var Promise = require('bluebird'),
	mongoose = Promise.promisifyAll(require('mongoose')),
	User = mongoose.model('User'),
	joi = require('joi'),
	pattern = require('utils/pattern');

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

	var username = request.payload.username;
	
	User.findOne({'username' : username})
		.execAsync()
		.then(function(user) {

			if(user) {

				reply.continue('User with same username already exists.');
				return;

			}

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
		'payload' : {
			'name' : joi.object().keys({
				'first' : joi.string().required(),
				'last' : joi.string().required()
			}),
			'emails' : joi.array().items(joi.string().regex(pattern.email)),
			'dob' : joi.object().keys({
				'year' : joi.number().required(),
				'month' : joi.number().required(),
				'date' : joi.number().required()
			}),
			'groups' : joi.array().items(joi.string().regex(pattern.objectId)),
			'password' : joi.string().required(),
			'username' : joi.string().required(),
			'created' : joi.number().required()
		} 
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