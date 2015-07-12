var server = require('../../server/app.js'),
	lab = exports.lab = require('lab').script(),
	request = {},
	describe = lab.describe,
	beforeEach = lab.beforeEach,
	it = lab.it,
	before = lab.before;

describe('Test cases for user route',function() {

	before(function(done) {

		setTimeout(function() {
			console.log(server.table());	
			done();
		},1000);
	});

	// beforeEach(function(done) {
	// 	request = {};
	// 	done();
	// });

	it('should get all users', function(done) {

		request = {
			method : 'GET',
			url : '/users',
			headers: {
			  'Content-Type': 'application/x-www-form-urlencoded',
			  'Content-Length': '12'
			}
		};

		server.inject(request,function(res) {
			console.log(res.result);
			done();
		});
	})
});