var Promise = require('bluebird'),
    mongoose = Promise.promisifyAll(require('mongoose')),
    Message = mongoose.model('Message'),
    UserUtils = require('utils/users'),
    MessageUtils = require('utils/messages'),
    GroupMessage = mongoose.model('GroupMessage');

module.exports = {
  
  one : One,
  get : Get,

  validateOwners : ValidateOwners

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