var Promise = require('bluebird'),
  	mongoose = Promise.promisifyAll(require('mongoose')),
  	User = mongoose.model('User'),
  	async = require('async');


function bootstrapUsers() {
  
  var users = [{
    name : {
      'first' : 'Pranay',
      'last' : 'Dubey'
    },
    dob : {
      year : 1992,
      month : 9,
      date : 30
    },
    password : 'demo',
    username : 'pranay@lets-chat.com',
    type : 'Admin'
  }];

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
