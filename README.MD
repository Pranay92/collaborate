Collaborate
=========

A well organised, structured and thought over server for chat application built using hapijs

# Why

Because we have lots of paid applications out there that allow you to chat using group chats or personal. It would be awesome if you can get something out for your own that you can deploy in easy steps in your desired environment using your own database.

# Advantages

1. You don't have to pay for chat apps.
2. You can fork and play around and add new features to it instead of making a feature request while using a paid app.
3. It provides a lot of insights as to how to deal with lots of traffic when using node and how to scale it.
4. Chat wherever you are with hybrid mobile app build using Ionic framework.

# Technology Stack (Initial Proposal)

1. Hapi.js as a node.js framework.
2. MongoDB for the database(using Mongoose)
3. Mocha for the server tests.
4. Server monitoring and logs - PM2.
5. Server side session storage - Redis.
6. Messaging queue - RabbitMQ.

# [Wiki](https://github.com/Pranay92/lets-chat/wiki)

# License

This software is licensed under the MIT license specifications.

## Getting Started

1. Do a ````npm install```` to install all the dependencies.
2. Create a ````.env```` file and store all the mongodb credentials in them. (see [environment variables](https://github.com/Pranay92/collaborate/wiki/Environment-variables))
3. Install `redis` for your system.
4. Run `redis-server &` to run redis server in the background.
5. Run the application using ````node app.js````


**Note** This is server only, client will be created on a separate repo.

## Contributors

1. [Pranay Dubey](https://github.com/Pranay92)
2. [Shamsher Ansari](https://github.com/Shamsher31)
