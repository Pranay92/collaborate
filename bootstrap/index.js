var Promise = require('bluebird'),
  	mongoose = Promise.promisifyAll(require('mongoose')),
  	User = mongoose.model('User'),
    Admin = mongoose.model('Admin'),
    Group = mongoose.model('Group'),
  	async = require('async'),
    users = require('bootstrap/users'),
    admins = require('bootstrap/admins'),
    groups = require('bootstrap/groups'),
    defaultAdmins = [],
    defaultGroups = [];

setTimeout(function() {
  
  var funcArray = [
    {
      execute : admins.bootstrap,
      argument : [defaultAdmins]
    },
    {
      execute : groups.bootstrap,
      argument : [defaultAdmins,defaultGroups]
    },
    {
      execute : users.bootstrap,
      argument : [defaultGroups]
    }
  ],
  argumentArray;

  async.series(funcArray.map(function(currFunc) {
    
    return function(cb) {
      argumentArray = currFunc.argument;
      argumentArray.unshift(cb);
      currFunc.execute.apply({},argumentArray);
    }

  }),function(err,results) {
    
    console.log('All users and default groups now added');
  
  });


},5000);
