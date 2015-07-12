var mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  util = require('util'),
  Schema = mongoose.Schema,
  _ = require('lodash'),
  SALT_WORK_FACTOR = 10,
  validate = require('mongoose-validate');

var schema = {
	admin : {
		type : Schema.ObjectId,
		ref : 'User'
	},
	users : [{
		type : mongoose.Types.ObjectId,
		ref : 'User'
	}],
	creator : {
		type : Schema.ObjectId,
		ref : 'User'
	},
	name : {
		type : String,
		required : true
	},
	about : {
		type : String
	},
	created : {
		type : Date,
		default : Date.now()
	}
};

var MongooseSchema = new mongoose.Schema(schema);

mongoose.model('Group', MongooseSchema);

exports.schema = schema;