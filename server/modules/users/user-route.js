module.exports = {
	get : {
		method : 'GET',
		path : '/users',
		config : {
			'handler' : function(request,reply) {
				reply('List of users received');
			}
		}
	}
}