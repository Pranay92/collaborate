var Promise = require('bluebird'),
    mongoose = Promise.promisifyAll(require('mongoose')),
    Group = mongoose.model('Group'),
    joi = require('joi'),
    pattern = require('utils/pattern');

module.exports = {

  one : One,
  add : Add,
  edit : Edit,
  delete : Delete,
  get : Get,
  bulkAdd : BulkAdd,
  bulkEdit : BulkEdit,
  bulkDelete : BulkDelete,

  validateReqOne  : ValidateReqOne,
  validateReqAdd  : ValidateReqAdd,
  validateReqEdit : ValidateReqEdit,
  validateReqDelete : ValidateReqDelete,
  validateReqGet : ValidateReqGet,
  validateReqBulkAdd : ValidateReqBulkAdd,
  validateReqBulkEdit : ValidateReqBulkEdit,
  validateReqBulkDelete : ValidateReqBulkDelete,

};

function One(request,reply) {

  var userId = request.auth.credentials.id;

  Group.find(request.params.id)
    .then(function(groupExist){
      
      if(!groupExist) {
        reply.next('Group not found');
        return;
      }

      if(group.users.indexOf(userId) < 0) {
        reply.next('Not authorized to view this group'); 
        return;
      }

      reply.data = groupExist;
      reply.next();
    })
    .catch(function(e) {
      reply.next(e);
    })
}

function Add(request,reply) {

  var name = request.payload.name;
  
  Group.findOne({'name' : name})
    .execAsync()
    .then(function(group) {

      if(group) {

        reply.next('Group with same group name already exists.');
        return;

      }

      reply.next();

    })
    .catch(function(e) {

      reply.next(e);

    });
}

function Edit(request,reply) {
  
  var userId = request.auth.credentials.id;

  Group.findOne({'admins' : {'$in' : [userId]}, '_id' : mongoose.Types.ObjectId(request.params.id) })
       .execAsync()
       .then(function(groupExist) {
          
          if(!groupExist) {
            reply.next('Group not found');
            return;
          }

          reply.data = groupExist;
          reply.next();

       })
       .catch(function(e) {
          reply.next(e);      
       });
  
}

function Delete(request,reply) {
  
  Group.findByIdAsync(request.params.id)
       .then(function(response) {
          
          if(!response) {
            reply.next();
            return;
          }

          console.log(request.auth.credentials,response.admins)
          if(response.admins.indexOf(request.auth.credentials.id) < 0) {
            reply.next('Not Authorized to delete this group');
            return;
          }

          reply.next();

       })
       .catch(function(e) {
          reply.next(e);
       });
}

function Get(request,reply) {
  reply.next();
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




function ValidateReqOne(request,reply) {

  return {
    params : {
      id : joi.string().regex(pattern.objectId)
    }
  };

}

function ValidateReqAdd() {

  return {
    
  };
}

function ValidateReqEdit() {

  return {

  };
}

function ValidateReqDelete() {

  return {
    params : {
      id : joi.string().regex(pattern.objectId)
    }
  };
}

function ValidateReqGet() {
  
  return {

  };
}

function ValidateReqBulkAdd() {

  return {

  };
}

function ValidateReqBulkEdit() {

  return {

  };
}

function ValidateReqBulkDelete() {

  return {

  };
}