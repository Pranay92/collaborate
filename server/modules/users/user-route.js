var Promise = require('bluebird'),
  	boom = require('boom'),
  	mongoose = Promise.promisifyAll(require('mongoose')),
  	User = mongoose.model('User'),
  	Controller = require('./user-controller'),
  	Validator = require('./user-validator'),
  	Series = require('../../utils/process');

module.exports = {
	get : {
		method : 'GET',
		path : '/users',
		config : {
			auth : {
				strategy : 'token',
				scope : ['admin']
			},
			handler : function(request,reply) {
				(new Series([
					Validator.validateGet,
					Controller.get
					]))
				.execute(request,reply);
			}
		}
	}
}