Collaborate
=========

A well organised, structured and thought over server for chat application built using hapijs. See [collaborate-client](https://github.com/Pranay92/collaborate-client) for front end.

## Why

Because we have lots of paid applications out there that provides group chats or personal. It would be awesome if you can get something similar that you can deploy in easy steps in your desired environment using your own database and optimizing as per your needs.

## Advantages

1. You control your own chat server.
2. Get experienced in handling complex real life scenarios and know how to scale them.
3. Add features/ideas that are way beyond the traditional chat server thing.


## Technology Stack (keeps getting updated)

1. Node server. - Hapi
2. MongoDB for the database. - Mongoose
3. Server unit tests. - Mocha
4. Server monitoring and logs. - PM2
5. Server side session storage. - Redis
6. Messaging queue - RabbitMQ
7. Web sockets - Socket.io

## Setup

1. Do a ````npm install```` to install all the dependencies.
2. Create a ````.env```` file and store all the mongodb credentials in them. (see [environment variables](https://github.com/Pranay92/collaborate/wiki/Environment-variables))
3. Run the application using ````node app.js````

## [Wiki](https://github.com/Pranay92/lets-chat/wiki)

## License

This software is licensed under the MIT license specifications.

## Contributors

1. [Pranay Dubey](https://github.com/Pranay92)
2. [Shamsher Ansari](https://github.com/Shamsher31)
3. [Devendra Dhanal](https://github.com/devendradhanal)
 
## TODO

1. Split server into two - api and socket.  
2. Implement partial response api on places where we don't need everything to be loaded.
3. Create multi threaded node server for better load handling.
