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

function One(request,reply,next) {
	User.findByIdAsync(request.params.id)
		.then(function(userExist){
			
			if(!userExist) {
				return next('User not found');
			}

			reply.data = userExist;
			next();
		})
		.catch(function(e) {
			next(e);
		})
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
	next();
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




function ValidateReqOne(request,reply,next) {

	return {
		params : {
			id : joi.string().regex(pattern.objectId)
		}
	};

}

function ValidateReqAdd(request,reply,next) {

	return {

	};
}

function ValidateReqEdit(request,reply,next) {

	return {

	};
}

function ValidateReqDelete(request,reply,next) {

	return {

	};
}

function ValidateReqGet(request,reply,next) {

	return {

	};
}

function ValidateReqBulkAdd(request,reply,next) {

	return {

	};
}

function ValidateReqBulkEdit(request,reply,next) {

	return {

	};
}

function ValidateReqBulkDelete(request,reply,next) {

	return {

	};
}