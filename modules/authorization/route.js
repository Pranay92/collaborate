var Series = require('hapi-next'),
    Validator = require('modules/authorization/validator'),
    Controller = require('modules/authorization/controller');

module.exports = {
  
  login : {
    method : 'POST',
    path : '/login',
    config : {
      validate : Validator.validateReqLogin(),
      handler : function(request,reply) {

        var series = new Series([
          Validator.login,
          Controller.login
        ]);
        
        series.execute(request,reply);
      }
    }
  },

  logout : {
    method : 'POST',
    path : '/logout',
    config : {
      handler : function(request,reply) {

        var series = new Series([
          Controller.logout
        ]);
        
        series.execute(request,reply);  
      }
    }
  }
  
}