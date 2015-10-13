var async = require('async');

module.exports = {
  initialize : Initialize
};


function Initialize(socket) {
  
  var listeners = Listeners();

  async.series(listeners.map(function(listObj) {
    return function(cb) {
      socket.on(listObj.event,listObj.handler);
      cb();
    }
  }),function(err,results) {
    console.log('Added listeners for new connection');
  }); 
  
};


function Listeners() {

  var listeners = [
          {
            'event'   : 'message',
            'handler' : Message
          },
          {
            'event'   : 'group-message',
            'handler' : GroupMessage
          },
          {
            'event'   : 'group-add',
            'handler' : GroupAdd

          },{
            'event'   : 'group-remove',
            'handler' : GroupRemove
          },
          {
            'event'   : 'group-create',
            'handler' : GroupCreate
          }
        ];

  return listeners;

};

function Message(server) {

};

function GroupMessage(server) {

};

function GroupAdd(server) {

};

function GroupRemove(server) {

};

function GroupCreate(server) {

};
 



