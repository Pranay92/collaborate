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
  Group.findByIdAsync(request.params.id)
    .then(function(groupExist){
      
      if(!groupExist) {
        return reply.continue('Group not found');
      }

      reply.data = groupExist;
      reply.continue();
    })
    .catch(function(e) {
      reply.continue(e);
    })
}

function Add(request,reply) {

  var name = request.payload.name;
  
  Group.findOne({'name' : name})
    .execAsync()
    .then(function(group) {

      if(group) {

        reply.continue('Group with same group name already exists.');
        return;

      }

      reply.continue();

    })
    .catch(function(e) {

      reply.continue(e);

    });
}

function Edit(request,reply) {
  reply.continue();
}

function Delete(request,reply) {
  
  Group.findByIdAsync(request.params.id)
       .then(function(response) {
          
          if(!response) {
            reply.continue();
            return;
          }

          console.log(request.auth.credentials,response.admins)
          if(response.admins.indexOf(request.auth.credentials.id) < 0) {
            reply.continue('Not Authorized to delete this group');
            return;
          }

          reply.continue();

       })
       .catch(function(e) {
          reply.continue(e);
       });
}

function Get(request,reply) {
  reply.continue();
}

function BulkAdd(request,reply) {
  reply.continue();
}

function BulkEdit(request,reply) {
  reply.continue();
}

function BulkDelete(request,reply) {
  reply.continue();
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