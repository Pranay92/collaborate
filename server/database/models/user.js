var mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  util = require('util'),
  Schema = mongoose.Schema,
  _ = require('lodash'),
  SALT_WORK_FACTOR = 10,
  validate = require('mongoose-validate');



var schema = {
	name : {
		first : {
			type : String,
			required : true
		},
		last : {
			type : String,
			required : true
		}
	},
	emails : [{
		address : {
			type : String,
			required : true,
			validate  : [validate.email, 'Invalid email address']
		},
		primary : {
			type : Boolean,
			default : true
		}
	}],
	dob : {
		year : {
			type : Number,
			required : true
		},
		month : {
			type : Number,
			required : true
		},
		date : {
			type : Number,
			required : true
		}
	},
	groups : [{
		type : Schema.ObjectId,
		ref : 'Group'
	}],
	password : {
		type : String,
		required : true
	},
	username : {
		type : String,
		required : true,
		unique : true
	},
	created : {
		type : Date,
		default : Date.now()
	}
};

var MongooseSchema = new mongoose.Schema(schema);

mongoose.model('User', MongooseSchema);

exports.schema = schema;