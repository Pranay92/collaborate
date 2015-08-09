var Promise = require('bluebird'),
  mongoose = Promise.promisifyAll(require('mongoose')),
  User = mongoose.model('User'),
  joi = require('joi'),
  pattern = require('utils/pattern');

module.exports = {

  login : Login,
  logout : Logout,

  validateReqLogin : ValidateReqLogin

};

function Login(request,reply) {

  User.LocalStrategy(request.payload.username,request.payload.password,function(err,user) {
    if(err) {
      console.log(err);
      return reply.next(err);
    }
    reply.data = user;
    reply.next();
  });
  
}

function Logout(request,reply) {
  
  if(!request.headers.authorization) {
    reply.data = {'logout' : true};
    return reply.next();
  }

  reply.next();

}


function ValidateReqLogin() {
  
  return {
    'payload' : {
      'username' : joi.string().required(),
      'password' : joi.string().required()
    }
  };
}

