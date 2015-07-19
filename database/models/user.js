var mongoose = require('mongoose'),
  bcrypt = require('bcryptjs'),
  util = require('util'),
  Schema = mongoose.Schema,
  _ = require('lodash'),
  SALT_WORK_FACTOR = 10,
  validate = require('mongoose-validate'),
  util = require('util');

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
    type : String,
    unique : true
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
		type : Number,
		default : new Date().getTime()
	},
	type : {
		type : String,
		default : 'User'
	}
};

exports.AbstractPersonSchema = function AbstractPersonSchema() {
  Schema.apply(this, arguments);

  this.add(schema);

};

util.inherits(this.AbstractPersonSchema, Schema);

var MongooseSchema = new this.AbstractPersonSchema();

/**
 * This is used to send back to the browser/client when
 * a person logs in.
 */
MongooseSchema.virtual('authenticationResponse').get(function () {

  var response = {
    id: this._id, // Persons mongo id
    type: this.type, // Persons role such as , member, doctor etc.
    name: this.name // Persons name for convenience
  };

  return response;
});

/**
 * Checks if the user is able to login.  Will return done as the second
 * argument the users mongodb id.
 *
 * @param username
 * @param password
 * @param done
 */
MongooseSchema.statics.LocalStrategy = function (username, password, done) {

  var usernamePattern;
  var usernameRegExp;

  usernamePattern = util.format('^%s$', username); // holds a string that will be used in a regex
  usernameRegExp = new RegExp(usernamePattern, 'i');

  this.findOne({
    username: usernameRegExp,
    active: true
  }, 'id password type name', function (err, person) {

    // Mongo general error running query
    if (err)
      return done(err);

    // Could not find the username in the database.
    if (!person)
      return done(new Error('User not found in the database.'));

    bcrypt.compare(password, person.password, function (err, isMatch) {

      // Error comparing the two password.
      if (err)
        return done(err);

      if (isMatch)
        return done(null, person.authenticationResponse); // Password matched!  Let user in and send back in the body an object with the id and type
      else
        return done(new Error('Password is incorrect.')); // Password did not match
    });
  });
};

/**
 * This will default to active=true is the active is not set correct.
 *
 * @param query the Hapi request.query
 * @public
 */
MongooseSchema.statics.Search = function (query, cb) {

  query = _.compactObject(query);

  if (query.active === 'true' || query.active === 'false')
    this.find(query, cb).where({active: query.active});
  else
    this.find(query, cb).where({active: true});

};

/**
 * Helper function that sets up the map reduce query.
 *
 * @param discriminatorType {String} The type of person, such as `Doctor`, `CSR`, `Member` etc.
 * @private
 */
function SetupMapReduceStatsQuery(discriminatorType) {

  var query;

  if (_.isNull(discriminatorType))
    query = {active: {$in: [true, false]}};
  else
    query = {active: {$in: [true, false]}, type: discriminatorType};

  return query;

}

/**
 *
 *
 * @param cb Callback
 * @public
 */
MongooseSchema.statics.Stats = function (cb) {

  var mapReduceOptions = {};
  var discriminatorType = this.schema.discriminatorMapping.value;

  mapReduceOptions.query = SetupMapReduceStatsQuery(discriminatorType);

  mapReduceOptions.map = function () {
    emit(this.active, 1);
  };

  mapReduceOptions.reduce = function (key, values) {
    return Array.sum(values);
  };

  this.mapReduce(mapReduceOptions, cb);
};

/**
 * Encrypt user password before it is saved/updated/crated in the database.
 */
MongooseSchema.pre('save', PreSave);

function PreSave(next) {

  var user = this;

  this.type = 'User';

  // Password was not modified so do not encrypt,
  if (!user.isModified('password'))
    next();

  // Has the password
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
    
    if (err) {
      next(err); // Throw error because the password was not able to be hased.
    } else {
      user.password = hash; // Update the hashed passsword into the database.
      next();
    }

  });
}

/**
 * Base Person model.
 *
 * Force the collection to be named `persons`.
 */
exports.Base = mongoose.model('User', MongooseSchema, 'users');
exports.schema = schema;
