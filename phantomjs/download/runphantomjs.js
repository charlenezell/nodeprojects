var page = require('webpage').create(),
  system = require('system');
var spawn = require("child_process").spawn

if (system.args.length === 1) {
  console.log('Usage: netsniff.js <some URL>');
  phantom.exit(1);
} else {
  var urls = [];
  page.address = system.args[1];
  page.onResourceReceived = function (res) {
    if (res.stage === 'start') {
      urls.push(res.url);
    }
  };
  page.open(page.address, function (status) {
    var har;
    if (status !== 'success') {
      console.log('FAIL to load the address');
      phantom.exit(1);
    } else {
      console.log('down resource ' + urls.length + ' urls.');
      var child = spawn("node", ["--harmony", "downHtml.js", urls.join(',')])
      child.stdout.on("data", function (data) {
       console.log(data);
      })
      child.stderr.on("data", function (data) {
       console.log(data);
      })
      child.on("exit", function (code) {
       phantom.exit();
      })
    }
  });
}
