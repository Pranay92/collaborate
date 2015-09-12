var Promise = require('bluebird'),
  mongoose = Promise.promisifyAll(require('mongoose')),
  User = mongoose.model('User'),
  ObjectId = mongoose.Types.ObjectId,
  Group = mongoose.model('Group');

module.exports = {

  one : One,
  add : Add,
  edit : Edit,
  delete : Delete,
  get : Get,
  bulkAdd : BulkAdd,
  bulkEdit : BulkEdit,
  bulkDelete : BulkDelete,
  removeUsers : RemoveUsers
  
};

function One(request,reply) {
  
  if(reply.data && reply.data._id) {
    return reply.next();
  }

  Group.findByIdAsyc(request.params.id)
    .then(function(groupExist){
      reply.data = groupExist;
      reply.next();
    })
    .catch(function(e) {
      reply.next(e);
    });

}

function Add(request,reply) {
  
  var group = new Group(request.payload);
  
  group.saveAsync()
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

  Group.findByIdAndRemoveAsync(request.params.id)
     .then(function(response) {
      reply.next();
     })
     .catch(function(e) {
      reply.next(e);
     });
}

function Get(request,reply) {

  Group.find({})
    .then(function(groups) {
      reply.data = groups;
      reply.next();
    })
    .catch(function(e) {
      reply.next({'msg' : 'Cannot fetch groups','error' : e});
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

function RemoveUsers(request,reply) {

  User.update({},{'$pull' : {'groups' : request.params.id} },{'multi' : true})
    .execAsync()
    .then(function(){
      reply.next();
    })
    .catch(function(e) {
      reply.next(e);
    });

}
