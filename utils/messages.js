var Promise = require('bluebird'),
    mongoose = Promise.promisifyAll(require('mongoose')),
    Message = mongoose.model('Message');

module.exports = {
  exists : Exists
};

function Exists(msgId,user) {

  var query = {
    '_id' : mongoose.Types.ObjectId(msgId),
    '$or' : [
      {
        'from' : mongoose.Types.ObjectId(user.id) 
      },
      {
        'to' : mongoose.Types.ObjectId(user.id) 
      }
    ]
  };

  return new Promise(function(resolve,reject) {
    
    Message.findOne(query)
        .then(function(msgFound) {

          if(!msgFound) {
            reject('No message found with id ' + msgId + ' for user ' + user.id);
            return;
          }

          resolve(msgFound);
        })
        .catch(function(e) {
          reject(e);
        });
  });
  
}


