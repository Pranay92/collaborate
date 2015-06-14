var async = require('async'),
	boom = require('boom');

function Series(arr) {
	this.arr = arr;
}

Series.prototype.execute = function(request,reply) {
	
	var index = 0,
		len = this.arr.length,
		request = request,
		reply = reply,
		arr = this.arr;

	async.series(arr.map(function(func) {
		return function(cb) {

			if(typeof func !== 'function') {
				throw new Error('Arguments passed series should be function', func);
				return;
			}

			func.call({},request,reply,function(err) {
				
				if(err) {
					return cb(err);
				}

				cb();
			});

		}
	}),function(err,results) {
		
		if(err) {
			reply(boom.badData(err));
		}

		reply.data = reply.data || {};
		reply(reply.data);
	});
};

module.exports = Series;