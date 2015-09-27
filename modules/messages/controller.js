var Promise = require('bluebird'),
    mongoose = Promise.promisifyAll(require('mongoose')),
    Message = mongoose.model('Message'),
    GroupMessage = mongoose.model('GroupMessage');