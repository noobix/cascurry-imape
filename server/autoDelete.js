const rimraf = require("rimraf");
const path = require("path");
const fs = require("fs");

var uploadsDir = path.normalize(__dirname + "/public/images");
fs.readdir(uploadsDir, function (err, files) {
  files?.forEach(function (file, index) {
    if (["jpeg"].includes(file.split(".").pop())) {
      fs.stat(path.join(uploadsDir, file), function (err, stat) {
        return rimraf(path.join(uploadsDir, file), {});
      });
    }
  });
});
