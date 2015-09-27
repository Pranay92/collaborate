var Promise = require('bluebird'),
    mongoose = Promise.promisifyAll(require('mongoose')),
    Admin = mongoose.model('Admin'),
    async = require('async'),
    collection;

module.exports = {
  'bootstrap' : BootStrap
};

collection = [
  {
    name : {
      'first' : 'Pranay',
      'last' : 'Dubey'
    },
    dob : {
      year : 1992,
      month : 8,
      date : 30
    },
    password : 'demo',
    username : 'pranay@lets-chat.com',
    emails : ['pranay@lets-chat.com'],
    type : 'Admin'
  },
  {
    name : {
      'first' : 'Shamsher',
      'last' : 'Ansari'
    },
    dob : {
      year : 1989,
      month : 2,
      date : 31
    },
    password : 'demo',
    username : 'shamsher@lets-chat.com',
    emails : ['shamsher@lets-chat.com'],
    type : 'Admin'
  }
];


function BootStrap(mainCb,defaultAdmins) {

  var currUser;

  async.series(collection.map(function(userObj) {
    return function(cb) {

      Admin.findOne({'username' : userObj.username})
               .execAsync()
               .then(function(userfound) {
                  
                  if(userfound) {
                    defaultAdmins.push(userfound._id);
                    return;
                  }

                  currUser = new Admin(userObj);
                  return currUser.saveAsync();
                  
               })
               .then(function(adminCreated){
                  if(adminCreated) {
                    adminCreated = adminCreated[0];
                    defaultAdmins.push(adminCreated._id);                    
                  }
               })
               .finally(function() {
                cb();
               })

    }
  }),function(err,results) {
    mainCb();
  });

}