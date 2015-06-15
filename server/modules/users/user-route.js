var Promise = require('bluebird'),
  	boom = require('boom'),
  	mongoose = Promise.promisifyAll(require('mongoose')),
  	User = mongoose.model('User'),
  	Controller = require('./user-controller'),
  	Validator = require('./user-validator'),
  	Series = require('hapi-next');

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
				
				var funcArray = [
					Validator.validateGet,
					Controller.get
				];

				var series = new Series(funcArray);
				series.execute(request,reply);

			}
		}
	}
}