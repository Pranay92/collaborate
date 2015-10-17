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
                      'event'   : 'message-join', // subscribe to one-to-one chat
                      'handler' : MessageJoin
                    },
                    {
                      'event'   : 'message', // message event on one-to-one chat
                      'handler' : Message
                    },
                    {
                      'event'   : 'message-edit', // edit message event on one-to-one chat
                      'handler' : MessageEdit
                    },
                    {
                      'event'   : 'message-delete', // delete msg event on one-to-one chat
                      'handler' : MessageDelete
                    },
                    {
                      'event'   : 'group-create', // group create event
                      'handler' : GroupCreate
                    },
                    {
                      'event'   : 'group-join', // group join event
                      'handler' : GroupJoin
                    },
                    {
                      'event'   : 'group-message', // message event on a group chat
                      'handler' : GroupMessage
                    },
                    {
                      'event'   : 'group-message-edit', // edit message event on a group chat
                      'handler' : GroupMessageEdit
                    },
                    {
                      'event'   : 'group-message-delete', // edit message event on a group chat
                      'handler' : GroupMessageDelete
                    },
                    {
                      'event'   : 'group-delete', // group delete event
                      'handler' : GroupDelete
                    },
                    {
                      'event'   : 'group-left', // group leave event
                      'handler' : GroupLeave
                    }
                  ];

  return listeners;

};

function MessageJoin(server) {

};

function Message(server) {

};

function MessageEdit(server) {

};

function MessageDelete(server) {

};

function GroupCreate(server) {

};

function GroupJoin(server) {

};

function GroupMessage(server) {

};

function GroupMessageEdit(server) {

};

function GroupMessageDelete(server) {

};

function GroupLeave(server) {

};

function GroupDelete(server) {

};



 



