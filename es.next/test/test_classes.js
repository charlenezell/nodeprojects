var assert = require("assert");
itest("traceur");
itest("babel");
function itest(name) {
	var Shape=require("../dest/"+name+"/classes0.js")
	var Retangle = require("../dest/"+name+"/classes.js");
	describe(name+"_"+'classes', function() {
		describe('SimpleClassConstructor', function() {
			it("should return new instance's name ", function() {
				assert.equal("hehe",new Shape("hehe").color);
			});
		});
		describe('inherience', function() {
			it("inherience value should be like parent", function() {
				assert.equal("red", new Retangle(20, 30, "red").color);
			});
			it("instance method should return 600", function() {
				assert.equal("600", new Retangle(20, 30, "red").showSize());
			});
		});
	});
}
