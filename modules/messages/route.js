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

};