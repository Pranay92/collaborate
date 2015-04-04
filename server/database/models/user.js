var mongoose = require('mongoose'),
  timestamps = require('mongoose-timestamp'),
  bcrypt = require('bcryptjs'),
  util = require('util'),
  Schema = mongoose.Schema,
  _ = require('lodash'),
  SALT_WORK_FACTOR = 10,
  LoadEmail = require('mongoose-type-email'),
  Email : mongoose.schemaTypes.Email;


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
			type : Email,
			required : true,
			primary : {
				type : Boolean,
				default : true
			}
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
		type : mongoose.Schema.types.ObjectId,
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
	}
};

var MongooseSchema = new mongoose.Schema(schema);

mongoose.model('User', MongooseSchema);

exports.schema = schema;