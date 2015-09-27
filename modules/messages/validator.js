var Promise = require('bluebird'),
    mongoose = Promise.promisifyAll(require('mongoose')),
    Message = mongoose.model('Message'),
    UserUtils = require('utils/users'),
    MessageUtils = require('utils/messages'),
    GroupMessage = mongoose.model('GroupMessage');

module.exports = {
  one : One,
  get : Get
};

function One(request,reply) {

  var msgId = request.params.id,
      userId = request.auth.credentials;

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