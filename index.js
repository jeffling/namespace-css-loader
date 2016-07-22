// loader runs namespace-css on file

var namespaceCss = require('namespace-css');
var loaderUtils = require('loader-utils');
var Readable = require('stream').Readable;

module.exports = function(source) {
	this.cacheable();

	var callback = this.async();
	var options = loaderUtils.parseQuery(this.query);
	options.selector = options.selector || '';
	var result = "";

	var s = new Readable;
	s.push(source);
	s.push(null);


	var resultStream = s.pipe(namespaceCss(options));
	
	resultStream.on('data', function(data) {
		result += data;
	});

	resultStream.on('end', function() {
		callback(null, result);
	});
}
