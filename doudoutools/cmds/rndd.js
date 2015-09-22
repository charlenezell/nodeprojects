/* rndd commander component
 * To use add require('../cmds/rndd.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';
var glob = require("glob");
var fs = require("fs");
var path = require("path");
var util = require("./util.js");
var tr = require('transliteration').slugify;

module.exports = function(program) {
	program
		.command('rndd <dir> <series>')
		.version('0.0.1')
		.description('prefix with index and translate to captial pingying ')
		.action(function(dir,series){
			glob.sync(dir).forEach(function(v, k) {
				var filename = path.basename(v).replace(path.extname(v), "");
				filename=tr(filename,{
					lowercase: true
				}).split("-").map(function(v){
					return v.charAt(0);
				}).join("");
				var rst = v.replace(path.basename(v), series+"-"+(k+1)+"_"+filename+path.extname(v));
				fs.renameSync(v, rst);
			})
		});

};
