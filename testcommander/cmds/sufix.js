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
		.command('sufix <dir> <sufixExpression>')
		.version('0.0.1')
		.description('sufix globs')
		.action(function(dir, sufixExpression) {
			glob.sync(dir).forEach(function(v, k) {
				var filename = path.basename(v).replace(path.extname(v), "");
				var rst = v.replace(path.basename(v), filename + util.template(sufixExpression, {
					index: k
				}) + path.extname(v));
				fs.renameSync(v, rst);
			})
		});

};
