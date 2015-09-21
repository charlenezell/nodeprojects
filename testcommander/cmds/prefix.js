/* sufix commander component
 * To use add require('../cmds/sufix.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';
var glob = require("glob");
var fs = require("fs");
var path = require("path");
var util = require("./util.js")
module.exports = function(program) {
	program
		.command('prefix <dir> <prefixExpression>')
		.version('0.0.1')
		.description('prefix globs')
		.action(function(dir, prefixExpression) {
			glob.sync(dir).forEach(function(v, k) {
				var filename = path.basename(v).replace(path.extname(v), "");
				var rst = v.replace(path.basename(v), util.template(prefixExpression, {
					index: k
				}) + filename + path.extname(v));
				fs.renameSync(v, rst);
			})
		});

};
