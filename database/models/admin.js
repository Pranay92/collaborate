var User = require('./user');

var schema = {
};

var MongooseSchema = new User.AbstractPersonSchema(schema);

MongooseSchema.pre('save', function(next) {
	this.type = 'Admin';
	next();
});

User.Base.discriminator('Admin', MongooseSchema);

exports.schema = schema;