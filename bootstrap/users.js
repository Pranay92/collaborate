var Promise = require('bluebird'),
    mongoose = Promise.promisifyAll(require('mongoose')),
    User = mongoose.model('User'),
    async = require('async'),
    collection;

module.exports = {
  'bootstrap' : BootStrap
};

collection = [
  {
    name : {
      'first' : 'Amrutha',
      'last' : 'Rao'
    },
    dob : {
      year : 1989,
      month : 1,
      date  : 2
    },
    password : 'demo',
    username : 'amrutha@lets-chat.com',
    emails : ['amrutha@lets-chat.com'],
    type : 'User'
  }
];


function BootStrap(mainCb,defaultGroups) {

  var currUser;

  async.series(collection.map(function(userObj) {
    return function(cb) {

      User.findOne({'username' : userObj.username})
               .execAsync()
               .then(function(userfound) {
                  
                  if(userfound) {
                    return;
                  }

                  userObj.groups = defaultGroups;
                  
                  currUser = new User(userObj);
                  return currUser.saveAsync();
                  
               })
               .finally(function() {
                cb();
               })

    }
  }),function(err,results) {
    mainCb();
  });

}