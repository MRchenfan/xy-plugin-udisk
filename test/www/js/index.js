document.addEventListener('deviceready', function() {
  /*
  文件操作
  */
  $('.file-operate .save-btn').click(function() {
    var path = cordova.file.externalDataDirectory + 'file.txt';
    var dataObj = new Blob(['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam adipisci ad dicta hic cupiditate neque, doloribus recusandae placeat necessitatibus excepturi, magni sequi. Rerum numquam sunt, ad reprehenderit commodi minima omnis.'], {
      type: 'text/plain'
    });
    fo.writeFile(path, dataObj, function(err, res) {

      console.log(err);
      console.log(res);
    });
  });

  $('.file-operate .read-btn').click(function() {
    var path = cordova.file.externalDataDirectory + 'file.txt';
    fo.readFile(path, function(err, res) {

      console.log(err);
      console.log(res);
    });
  });

  $('.file-operate .copy-btn').click(function() {
    var path = cordova.file.externalDataDirectory + 'file.txt';
    var newPath = cordova.file.externalDataDirectory;
    var newName = 'copy-file.txt';
    fo.copyFile(path, newPath, newName, function(err, res) {

      console.log(err);
      console.log(res);
    });
  });

  $('.file-operate .move-btn').click(function() {

    fo.moveFile(path, newPath, function(err, res) {

      console.log(err);
      console.log(res);
    });
  });

  $('.file-operate .remove-btn').click(function() {

    fo.rm(path, function(err, res) {

      console.log(err);
      console.log(res);
    });
  });

  /*
  文件夹操作
  */
  $('.directory-operate .save-btn').click(function() {

    var rootPath = cordova.file.externalDataDirectory;
    var path = 'a/b';
    fo.mkdir(rootPath, path, function(err, res) {

      console.log(err);
      console.log(res);
    });
  });

  $('.directory-operate .read-btn').click(function() {

    fo.readDir(path, function(err, res) {

      console.log(err);
      console.log(res);
    });
  });

  $('.directory-operate .copy-btn').click(function() {

    fo.copyDir(path, function(err, res) {

      console.log(err);
      console.log(res);
    });
  });

  $('.directory-operate .move-btn').click(function() {

    fo.moveDir(path, function(err, res) {

      console.log(err);
      console.log(res);
    });
  });

  $('.directory-operate .remove-btn').click(function() {

    fo.rm(path, function(err, res) {

      console.log(err);
      console.log(res);
    });
  });
}, false);