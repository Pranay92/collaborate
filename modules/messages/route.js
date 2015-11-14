var boom = require('boom'),
    Controller = require('modules/messages/controller'),
    Validator = require('modules/messages/validator'),
    Series = require('hapi-next');

module.exports = {

  one : {
    method : 'GET',
    path : '/messages/{id}',
    config : {
      auth : {
        strategy : 'token',
        scope : ['admin','user']
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
    path : '/messages',
    config : {
      auth : {
        strategy : 'token'
      },
      validate : Validator.validateReqGet(),
      handler : function(request,reply) {

        var funcArray = [
          Validator.get,
          Validator.validateOwners,
          Controller.get
        ];

        var series = new Series(funcArray);
        series.execute(request,reply);
      }
    }
  },

  add : {
    method : 'POST',
    path : '/messages',
    config : {
      auth : {
        strategy : 'token'
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
  }

};