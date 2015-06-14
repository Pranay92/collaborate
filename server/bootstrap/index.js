var Promise = require('bluebird'),
  	mongoose = Promise.promisifyAll(require('mongoose')),
  	User = mongoose.model('User'),
  	async = require('async'),
    users = require('./users');

function bootstrapUsers() {

  var currModel,
      currUser;

  async.series(users.map(function(userObj) {
    return function(cb) {

      currModel = mongoose.model(userObj.type);
      currModel.findOne({'username' : userObj.username})
               .execAsync()
               .then(function(userfound) {
                  
                  if(userfound) {
                    return;
                  }

                  currUser = new currModel(userObj);
                  return currUser.saveAsync();
                  
               })
               .finally(function() {
                cb();
               })

    }
  }),function(err,results) {
    console.log('Default users now present in the database');
  });
}



setTimeout(function() {
  bootstrapUsers(); 
},5000);
