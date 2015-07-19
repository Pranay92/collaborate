var Promise = require('bluebird'),
  	mongoose = Promise.promisifyAll(require('mongoose')),
  	User = mongoose.model('User'),
    Admin = mongoose.model('Admin'),
    Group = mongoose.model('Group'),
  	async = require('async'),
    users = require('bootstrap/users'),
    admins = require('bootstrap/admins'),
    groups = require('bootstrap/groups'),
    defaultGroup,
    defaultAdmins = [];




setTimeout(function() {
  
  var funcArray = [
    {
      execute : admins.bootstrap,
      argument : defaultAdmins
    },
    {
      execute : groups.bootstrap,
      argument : defaultAdmins
    },
    {
      execute : users.bootstrap,
      argument : null
    }
  ];

  async.series(funcArray.map(function(currFunc) {
    
    return function(cb) {
      currFunc.execute.call({},cb,currFunc.argument);
    }

  }),function(err,results) {
    
    console.log('All users and default groups now added');
  
  });


},5000);
