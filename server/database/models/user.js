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

MongooseSchema.statics.LocalStrategy = function (username, password, done) {

  var usernamePattern;
  var usernameRegExp;

  usernamePattern = util.format('^%s$', username); // holds a string that will be used in a regex
  usernameRegExp = new RegExp(usernamePattern, 'i');

  this.findOne({
    username: usernameRegExp,
    active: true
  }, 'id password __t name', function (err, person) {

    // Mongo general error running query
    if (err)
      return done(err);

    // Could not find the username in the database.
    if (!person)
      return done(new Error('User not found in the database.'));

    bcrypt.compare(password, person.password, function (err, isMatch) {

      if (err)
        return done(err);

      if (isMatch)
        return done(null, person.authenticationResponse); // Password matched!  Let user in and send back in the body an object with the id and __t
      else
        return done(new Error('Password is incorrect.')); // Password did not match
    });
  });
};


mongoose.model('User', MongooseSchema);

exports.schema = schema;