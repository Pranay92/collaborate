var mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  util = require('util'),
  Schema = mongoose.Schema,
  _ = require('lodash'),
  SALT_WORK_FACTOR = 10,
  validate = require('mongoose-validate');

var schema = {
	admins : [{
		type : Schema.ObjectId,
		ref : 'User'
	}],
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
		required : true,
		unique : true
	},
	about : {
		type : String
	},
	created : {
		type : Number,
		default : new Date().getTime()
	},
	updated : {
		type : Number,
		default  :new Date().getTime()
	}
};

var MongooseSchema = new mongoose.Schema(schema);

mongoose.model('Group', MongooseSchema);

exports.schema = schema;