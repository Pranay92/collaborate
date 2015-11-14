var Promise = require('bluebird'),
    mongoose = Promise.promisifyAll(require('mongoose')),
    Message = mongoose.model('Message'),
    UserUtils = require('utils/users'),
    MessageUtils = require('utils/messages'),
    GroupMessage = mongoose.model('GroupMessage'),
    joi = require('joi'),
    pattern = require('utils/pattern');

module.exports = {
  
  one : One,
  get : Get,
  add : Add,

  validateOwners : ValidateOwners,

  validateReqOne : ValidateReqOne,
  validateReqGet : ValidateReqGet,
  validateReqAdd : ValidateReqAdd

};

function One(request,reply) {

  var msgId = request.params.id,
      user = request.auth.credentials;

  MessageUtils.exists(msgId,user)
              .then(function(msg){
                reply.data = msg;
                reply.next();
              })
              .catch(function(e) {
                reply.next(e);
              });
}

function Get(request,reply) {

  UserUtils.exists(request.params.from)
           .then(function(){
              return UserUtils.exists(request.params.to);
           })
           .then(function(){
              reply.next();
           })
           .catch(function(e){
            reply.next(e);
           });
}

function Add(request,reply) {

  UserUtils.exists(request.params.from)
          .then(function() {
            return UserUtils.exists(request.params.to);
          })
          .then(function() {
            reply.next();
          })
          .catch(function(e) {
            reply.next(e);
          });

}

function ValidateReqOne(request,reply) {

  return {
    params : {
      id : joi.string().regex(pattern.objectId)
    }
  };

}

function ValidateReqGet(request,reply) {

}

function ValidateReqAdd(request,reply) {
  
  return {
    payload : {
      from : joi.string().regex(pattern.objectId),
      to : joi.string().regex(pattern.objectId),
      content : joi.string(),
      created : joi.number()
    }
  };
}

function ValidateOwners(request,reply) {
  
  var userId = request.auth.credentials.id,
      from = request.params.from,
      to = request.params.to;

  if(userId == from || userId == to) {
    reply.next();
    return;
  }

  reply.next('Not authorized to view messages');

}