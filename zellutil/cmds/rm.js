'use strict';

var del = require("del");
var path = require('path');
function list(val) {
  return val.split(',');
}
module.exports = function (program, opts) {
  program.option('-p, --patterns <items>', 'A list of pattern seperated by "," will sufix the path argument', list, []).command('rm <path>').action(function (_path) {
    var rst, toDel;
    if (program.patterns.length > 0) {
      toDel = program.patterns.map(function (v) {
        return path.join(_path, v);
      });
    } else {
      toDel = _path;
    }
    rst = del.sync(toDel);
    var sepStr = require("os").EOL;
    program.log.info(rst.length > 0 ? rst.join(sepStr) : "no file del for not matching that path or pattern");
  });
};