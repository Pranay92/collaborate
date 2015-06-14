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
		type : Date,
		default : Date.now()
	}
};

var MongooseSchema = new mongoose.Schema(schema);

mongoose.model('GroupMessage', MongooseSchema);

exports.schema = schema;