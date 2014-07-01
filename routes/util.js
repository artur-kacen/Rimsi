/**
 * Created by KACENAR1 on 14.6.1.
 */
var fs = require('fs');
var path = require('path');

exports.uploadPhoto = function(req, res) {
    var file = req.files.file;
    var gallery_dir = __dirname + "/../public/images/gallery";

    function saveFiles() {
        fs.readFile(file.path, function (err, data) {
            // ...
            var newPath = gallery_dir + "/" + file.originalFilename;
            fs.writeFile(newPath, data, function (err) {
                if (err == null) {
                    fs.unlinkSync(file.path);
                    res.send(200);
                } else {
                    console.error(err);
                    res.send(500);
                }
            });
        });
    }

    if (typeof file != "undefined" && file != null) {
        fs.lstat(gallery_dir, function(err, stats) {
            if (err || !stats.isDirectory()) {
                fs.mkdir(gallery_dir, saveFiles);
            } else {
                saveFiles();
            }

        });
    }
};