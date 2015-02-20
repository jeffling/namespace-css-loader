// loader runs namespace-css on file

var namespaceCss = require('namespace-css');
var Readable = require('stream').Readable;

module.exports = function(source) {
	this.cacheable();

	var callback = this.async();
	var query = this.query.slice(1); 
	var result = "";

	var s = new Readable;
	s.push(source);
	s.push(null);


	var resultStream = s.pipe(namespaceCss({
		selector: query 
	}));
	
	resultStream.on('data', function(data) {
		result += data;
	});

	resultStream.on('end', function() {
		callback(null, result);
	});
}
