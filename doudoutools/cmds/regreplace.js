/* regreplace commander component
 * To use add require('../cmds/regreplace.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';
var glob = require("glob");
var fs = require("fs");
var path = require("path");
var util = require("./util.js");
module.exports = function(program) {
	program
		.command('regreplace <dir> <reg> <capturesexpression>')
		.version('0.0.1')
		.description('replace glob/reg with sth')
		.action(function(dir, reg, capturesexpression) {
			var _reg = new RegExp(reg, "img");
			glob.sync(dir).forEach(function(v, k) {
				var _capturesexpression = util.template(capturesexpression, {
					index: k
				});
				//var filename = path.basename(v).replace(path.extname(v), "");
				var rst = v.replace(path.basename(v), path.basename(v).replace(_reg, _capturesexpression));
				fs.renameSync(v, rst);
			})
		});

};
