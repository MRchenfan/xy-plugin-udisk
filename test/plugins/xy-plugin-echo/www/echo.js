var exec = require('cordova/exec');

module.exports = function(str, success, fail) {
	exec(success, fail, 'Echo', 'echo', [str]);
};
