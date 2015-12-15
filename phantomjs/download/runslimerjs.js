var casper = require('casper').create({
  onResourceReceived:function(res){
    console.log(res);
  }
});

casper.start('http://www.100bt.com/', function() {
console.log("opened")
});

casper.run();
