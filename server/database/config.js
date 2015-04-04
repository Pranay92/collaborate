'use strict';

/** @module database */

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    mongodbUri = require('mongodb-uri'),
    requireDirectory = require('require-directory'),
    Promise = require('bluebird'),
    mongoose = require('mongoose'),
    async = require('async');

var uri;
// Require all the mongoose models declarations
exports.models = requireDirectory(module, __dirname + '/models');

// Format the mongo connection URI
uri = mongodbUri.formatMongoose({
  hosts: JSON.parse(process.env.MONGO_HOSTS),
  database: process.env.MONGO_DATABASE,
});

// Connect to the mongodb
mongoose.connect(uri);

mongoose.connection.on('error', console.error.bind(console));

mongoose.connection.once('open', function () {
  console.log('mongodb connection established.');
});