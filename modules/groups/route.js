var boom = require('boom'),
    Controller = require('modules/groups/controller'),
    Validator = require('modules/groups/validator'),
    Series = require('hapi-next');

module.exports = {
  one : {
    method : 'GET',
    path : '/groups/{id}',
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
  edit : {
    method : 'PUT',
    path : '/groups/{id}',
    config : {
      auth : {
        strategy : 'token',
        scope : ['admin','user']
      },
      validate : Validator.validateReqOne(),
      handler : function(request,reply) {

        var funcArray = [
          Validator.edit,
          Controller.edit
        ];

        var series = new Series(funcArray);
        series.execute(request,reply);
      }
    }
  },
  get : {
    method : 'GET',
    path : '/groups',
    config : {
      auth : {
        strategy : 'token',
        scope : ['admin','user']
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
    path : '/groups',
    config : {
      auth : {
        strategy : 'token',
        scope : ['admin','user']
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
  delete : {
    method : 'DELETE',
    path : '/groups/{id}',
    config : {
      auth : {
        strategy : 'token',
        scope : ['admin','user']
      },
      validate : Validator.validateReqDelete(),
      handler : function(request,reply) {

        var funcArray = [
          Validator.delete,
          Controller.removeUsers,
          Controller.delete
        ];

        var series = new Series(funcArray);
        series.execute(request,reply);
      }
    } 
  }
}