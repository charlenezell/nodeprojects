// Expression bodies

// Statement bodies


// Lexical this


exports.getNumbPlusOne = function(arr) {
	return arr.map(v => v + 1);
}
exports.getEvenNumb = function(arr) {
	var g = []
	arr.forEach(v => {
		if (v % 2 === 0) {
			g.push(v)
		}
	});
	return g;
}
exports.callMeBobIn10ms = function(obj) {
	var bob = {
		name: "Bob",
		callme() {
			setTimeout(() => {
				obj.rst="hello," + this.name;
			},10);
		}
	};
	bob.callme();
}
