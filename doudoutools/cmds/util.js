module.exports.template = function(g, data) {
	return g.replace(/%\{(.+)\}/g, function(a, b) {
		return data[b]
	});
}
