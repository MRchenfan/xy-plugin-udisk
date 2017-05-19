!(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof define === 'function' && define.cmd) {
		define(function(require, exports, module) {
			module.exports = factory();
		});
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.fo = factory();
	}
}(this, function() {

	var _error = {
		resolveUrlError: '解析路径错误',
		openDirError: '打开文件夹错误',
		openFileError: '打开文件错误',
		copyToError: '复制错误',
		removeError: '删除文件错误'
	};

	var fo = {

		// file operate

		readFile: function(path, cb, method) {

			if (method.indexOf('text') > -1) {

				method = 'readAsText';
			} else if (method.indexOf('binary') > -1) {

				method = 'readAsBinaryString';
			} else if (method.indexOf('arrayBuffer') > -1) {

				method = 'readAsArrayBuffer';
			} else {

				method = 'readAsText';
			}

			window.resolveLocalFileSystemURL(path, function(fileEntry) {

				onSuccess(fileEntry);
			}, function() {

				onError(_error.resolveUrlError);
			});

			function onSuccess(fileEntry) {

				fileEntry.file(function(file) {

					var reader = new FileReader();

					reader[method](file);

					reader.onerror = function(err) {

						onError(err);
					};	

					reader.onload = function() {

						if (typeof cb === 'function') {
							cb({
								success: true,
								result: this.result
							});
						}
					};
				});
			}

			function onError(err) {

				if (typeof cb === 'function') {
					cb({
						success: false,
						error: err
					});
				}
			}
		},

		writeFile: function(path, dataObj, cb) {
			path = _resolvePath(path);
			console.log(path);
			var dirPath = path.dirname;
			var fileName = path.basename;
			window.resolveLocalFileSystemURL(dirPath, function(dirEntry) {

				dirEntry.getFile(fileName, {
					create: true
				}, function(fileEntry) {

					onSuccess(fileEntry);
				}, function() {

					onError(_error.openFileError)
				});
			}, function() {

				onError(_error.resolveUrlError)
			});

			function onSuccess(fileEntry) {

				console.log(fileEntry);
				fileEntry.createWriter(function(fileWriter) {

					if (!dataObj) {
						dataObj = new Blob(['some file data'], {
							type: 'text/plain'
						});
					}

					fileWriter.write(dataObj);

					fileWriter.onwriteend = function() {

						if (typeof cb === 'function') {
							cb({
								success: true
							});
						}
					};

					fileWriter.onerror = function(err) {
						onError(err);
					};
				});
			}

			function onError(err) {

				if (typeof cb === 'function') {
					cb({
						success: false,
						error: err
					});
				}
			}
		},

		copyFile: function(path, newPath, newName, cb) {

			path = _resolvePath(path);
			var dirPath = path.dirname;
			var fileName = path.basename;
			newName = newName ? newName : fileName;
			window.resolveLocalFileSystemURL(dirPath + '/' + fileName, function(entry) {

				window.resolveLocalFileSystemURL(newPath, function(newEntry) {

					entry.copyTo(newEntry, newName, function() {

						onSuccess();
					}, function() {

						onError(_error.copyToError);
					})
				});
			}, function() {

				onError(_error.resolveUrlError);
			});

			function onSuccess() {

				if (typeof cb === 'function') {
					cb({
						success: true
					});
				}
			}

			function onError(err) {

				if (typeof cb === 'function') {
					cb({
						success: false,
						error: err
					});
				}
			}
		},

		moveFile: function(path, newPath, cb) {

			path = _resolvePath(path);
			var dirPath = path.dirname;
			var fileName = path.basename;
			newName = newName ? newName : fileName;
			window.resolveLocalFileSystemURL(dirPath + '/' + fileName, function(entry) {

				window.resolveLocalFileSystemURL(newPath, function(newEntry) {

					entry.moveTo(newEntry, newName, function() {

						onSuccess();
					}, function() {

						onError(_error.copyToError);
					})
				});
			}, function() {

				onError(_error.resolveUrlError);
			});

			function onSuccess() {

				if (typeof cb === 'function') {
					cb({
						success: true
					});
				}
			}

			function onError(err) {

				if (typeof cb === 'function') {
					cb({
						success: false,
						error: err
					});
				}
			}
		},

		// dir operate

		readDir: function(path, cb) {},

		mkdir: function(rootPath, path, cb) {

			window.resolveLocalFileSystemURL(rootPath, function(dirEntry) {

				dirEntry.getDirectory(path, {
					create: true
				}, function(dirEntry) {

					onSuccess(dirEntry);
				}, function() {

					onError(_error.mkdirError);
				});
			})

			function onSuccess(res) {

				if (typeof cb === 'function') {
					cb({
						success: true,
						result: res
					});
				}
			}

			function onError(err) {

				if (typeof cb === 'function') {
					cb({
						success: false,
						error: err
					});
				}
			}
		},

		copyDir: function(path, newPath, cb) {},

		moveDir: function(path, newPath, cb) {},

		// common operate

		rm: function(path, cb) {

			window.resolveLocalFileSystemURL(path, function(entry) {

				entry.remove(function() {

					onSuccess();
				}, function() {

					onError(_error.removeError);
				});
			}, function() {

				onError(_error.resolveUrlError);
			});

			function onSuccess() {

				if (typeof cb === 'function') {
					cb({
						success: true
					});
				}
			}

			function onError(err) {

				if (typeof cb === 'function') {
					cb({
						success: false,
						error: err
					});
				}
			}
		}
	};

	function _resolvePath(path) {
		return {
			dirname: path.substring(0, path.lastIndexOf('/') - 1),
			basename: path.substring(path.lastIndexOf('/') + 1, path.length)
		};
	}

	return fo;
}));