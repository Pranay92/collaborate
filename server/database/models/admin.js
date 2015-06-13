var mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  util = require('util'),
  Schema = mongoose.Schema,
  User = require('./user'),
  _ = require('lodash'),
  SALT_WORK_FACTOR = 10,
  validate = require('mongoose-validate');

var schema = {
	type : {
		type : String,
		default : 'Admin'
	}
};

var MongooseSchema = new User.AbstractPersonSchema(schema);

User.Base.discriminator('Admin', MongooseSchema);

exports.schema = schema;