var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var schema = {
  from : {
    type : Schema.ObjectId,
    ref : 'User'
  },
  content : {
    type : String,
    required : true
  },
  group : {
    type : Schema.ObjectId,
    ref : 'Group'
  },
  created : {
    type : Number,
    default : new Date().getTime()
  },
  type : {
    type : String,
    enum : ['notification','message'],
    default : 'message'
  }
};

var MongooseSchema = new mongoose.Schema(schema);

mongoose.model('GroupMessage', MongooseSchema);

exports.schema = schema;