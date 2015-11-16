var Promise = require('bluebird'),
    mongoose = Promise.promisifyAll(require('mongoose')),
    User = mongoose.model('User');

module.exports = {

  one : One,
  add : Add,
  edit : Edit,
  delete : Delete,
  get : Get,
  bulkAdd : BulkAdd,
  bulkEdit : BulkEdit,
  bulkDelete : BulkDelete
  
};

function One(request,reply) {
  
  if(reply.data && reply.data._id) {
    return reply.next();
  }

  User.findByIdAsyc(request.params.id)
    .then(function(userExist){
      reply.data = userExist;
      reply.next();
    })
    .catch(function(e) {
      reply.next(e);
    });
}

function Add(request,reply) {
  
  var user = new User(request.payload);
  
  user.saveAsync()
    .then(function() {
      reply.next();
    })
    .catch(function(e) {
      reply.next(e);
    });
}

function Edit(request,reply) {
  reply.next();
}

function Delete(request,reply) {
  reply.next();
}

function Get(request,reply) {

  User.find({})
    .then(function(users) {
      reply.data = users;
      reply.next();
    })
    .catch(function(e) {
      reply.next({'msg' : 'Cannot fetch users','error' : e});
    });
    
}

function BulkAdd(request,reply) {
  reply.next();
}

function BulkEdit(request,reply) {
  reply.next();
}

function BulkDelete(request,reply) {
  reply.next();
}
