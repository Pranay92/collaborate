var Promise = require('bluebird'),
    mongoose = Promise.promisifyAll(require('mongoose')),
    User = mongoose.model('User');

module.exports = {
  exists : Exists
};

function Exists(userId) {

  return new Promise(function(resolve,reject) {
    
    User.findOne(userId)
        .then(function(userFound) {

          if(!userFound) {
            reject('No user found with id ' + userId);
            return;
          }

          resolve(userFound);
        })
        .catch(function(e) {
          reject(e);
        });
  });
  
}


