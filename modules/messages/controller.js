var Promise = require('bluebird'),
    mongoose = Promise.promisifyAll(require('mongoose')),
    Message = mongoose.model('Message'),
    GroupMessage = mongoose.model('GroupMessage');

module.exports = {
  one : One,
  get : Get,
  add : Add
};

function One(request,reply) {

  if(reply.data && reply.data._id) {
    return reply.next();
  }

  Message.findOne(request.params.id)
         .then(function(msg) {
            reply.data = msg;
            reply.next();
         })
         .catch(function(e){
            reply.next(e);
         });
}


function Get(request,reply) {
  
  var query = {
    from : request.query.from,
    to : request.query.to,
    created : {
      '$gte' : request.query.start,
      '$lte' : request.query.end
      }
    },
    limit = 10; 

  Message.find(query)
         .limit(limit)
         .then(function(results) {
            reply.data = results;
            reply.next();
         })
         .catch(function(e) {
            reply.next(e);
         });
}

function Add(request,reply) {

  //TODO: Add socket and DB logic here
  reply.next();
}