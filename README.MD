lets-chat
=========

A full fledged web application that will allow people to communicate with each other on web.

# Why

Because we have lots of paid applications out there that allow you to chat using group chats or personal. It would be awesome if you can get something out for your own that you can deploy in easy steps in your desired environment using your own database.

# Advantages

1. You don't have to pay for chat apps.
2. You can fork and play around and add new features to it instead of making a feature request while using a paid app.
3. It provides a lot of insights as to how to deal with lots of traffic when using node and how to scale it.
4. Chat wherever you are with hybrid mobile app build using Ionic framework.

# Technology Stack (Initial Proposal)

1. Angular for the front-end, Material Design for the awesome UI.
2. Hapi.js as a node.js framework.
3. MongoDB for the database(using Mongoose)
4. Browserify to load all the dependencies and bundling and minification.
5. Gulp for the build tasks.
6. Protractor for the e2e tests. 
7. Mocha for the express tests.
8. Ionic Framework for mobile app.
9. Server monitoring and logs - PM2.
10. Server side session storage - Redis.
11. Messaging queue - RabbitMQ.

# [Wiki](https://github.com/Pranay92/lets-chat/wiki)

# License

This software is licensed under the MIT license specifications.

## Getting Started

1. Do a ````npm install```` to install all the dependencies.
2. Create a ````.env```` file and store all the mongodb credentials in them. (see config.js for variable names and/or read on ````dotenv```` npm module)
3. Install `redis` for your system.
4. Run `redis-server &` to run redis server in the background.
5. Run the application using ````node app.js````

