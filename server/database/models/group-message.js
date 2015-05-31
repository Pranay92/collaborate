var mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  util = require('util'),
  Schema = mongoose.Schema,
  _ = require('lodash'),
  SALT_WORK_FACTOR = 10,
  validate = require('mongoose-validate');


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
		type : Date,
		default : Date.now()
	}
}



var MongooseSchema = new mongoose.Schema(schema);

mongoose.model('GroupMessage', MongooseSchema);

exports.schema = schema;