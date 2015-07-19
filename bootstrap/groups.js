var Promise = require('bluebird'),
    mongoose = Promise.promisifyAll(require('mongoose')),
    Group = mongoose.model('Group'),
    async = require('async'),
    collection;

module.exports = {
  'bootstrap' : BootStrap
};

collection = [
  {
    users : [],
    name : 'Basic Group',
    about : 'This is a basic group created on server startup.',
    created : (new Date()).getTime()
  }
];


function BootStrap(mainCb,defaultAdmins) {

  var currGroup;

  async.series(collection.map(function(grpObj) {
    return function(cb) {

      Group.findOne({'name' : grpObj.name})
               .execAsync()
               .then(function(grpFound) {
                  
                  if(grpFound) {
                    return;
                  }

                  grpObj.admins = defaultAdmins;
                  currGroup = new Group(grpObj);
                  return currGroup.saveAsync();
                  
               })
               .finally(function() {
                cb();
               })

    }
  }),function(err,results) {
    mainCb();
  });

}