var Promise = require('bluebird'),
  	boom = require('boom'),
  	mongoose = Promise.promisifyAll(require('mongoose')),
  	User = mongoose.model('User'),
  	Controller = require('./user-controller'),
  	Validator = require('./user-validator'),
  	Series = require('hapi-next');

module.exports = {
	one : {
		method : 'GET',
		path : '/users/{id}',
		config : {
			auth : {
				strategy : 'token',
				scope : ['admin']
			},
			validate : Validator.validateReqOne(),
			handler : function(request,reply) {

				var funcArray = [
					Validator.one,
					Controller.one
				];

				var series = new Series(funcArray);
				series.execute(request,reply);
			}
		}
	},
	get : {
		method : 'GET',
		path : '/users',
		config : {
			auth : {
				strategy : 'token',
				scope : ['admin']
			},
			validate : Validator.validateReqGet(),
			handler : function(request,reply) {
				
				var funcArray = [
					Validator.get,
					Controller.get
				];

				var series = new Series(funcArray);
				series.execute(request,reply);

			}
		}
	},
	add : {
		method : 'POST',
		path : '/users',
		config : {
			auth : {
				strategy : 'token',
				scope : ['admin']
			},
			validate : Validator.validateReqAdd(),
			handler : function(request,reply) {

				var funcArray = [
					Validator.add,
					Controller.add
				];

				var series = new Series(funcArray);
				series.execute(request,reply);
			}
		}
	},
}