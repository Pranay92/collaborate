'use strict';

/** @module database */

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    mongodbUri = require('mongodb-uri'),
    requireDirectory = require('require-directory'),
    models = [],
    uri;
    
exports.models = requireDirectory(module, './models');

uri = mongodbUri.formatMongoose({
  hosts: JSON.parse(process.env.MONGO_HOSTS),
  database: process.env.MONGO_DATABASE,
});

mongoose.connect(uri);

mongoose.connection.on('error', console.error.bind(console));
mongoose.connection.once('open', function () {
  console.log('mongodb connection established.');
});





