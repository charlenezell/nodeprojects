var assert = require("assert");
itest("traceur");
itest("babel");

function itest(name) {
	var totest = require("../dest/"+name+"/arrows.js");
	describe(name+"_"+'arrows', function() {
		describe('expression', function() {
			it('should return 1,2,3,4 for 0,1,2,3', function() {
				assert.deepEqual([1, 2, 3, 4], totest.getNumbPlusOne([0, 1, 2, 3]));
			});
		});
		describe('Statement', function() {
			it('should return 0,2,4,6 for 0,1,2,3,4,5,6', function() {
				assert.deepEqual([0, 2, 4, 6], totest.getEvenNumb([0, 1, 2, 3, 4, 5, 6]));
			});
		});
		describe('Lexical this', function() {
			it('should return hello', function(done) {
				var rst = {};
				totest.callMeBobIn10ms(rst);
				setTimeout(function() {
					assert.equal("hello,Bob", rst.rst);
					done();
				}, 500);
			});
		});
	});
}
