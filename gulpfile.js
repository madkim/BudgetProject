const { series, task } = require("gulp");

var exec = require("child_process").exec;

task("ion-build", function (cb) {
  exec("ionic build", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

task("serve", function (cb) {
  exec("ionic serve", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

task("sync", function (cb) {
  exec("npx cap sync", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

task("open-ios", function (cb) {
  exec("npx cap open ios", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

task("open-android", function (cb) {
  exec("npx cap open ios", function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

exports.build = task("ion-build");

exports.run = series("ion-build", "serve");
exports["run-ios"] = series("ion-build", "sync", "open-ios");
exports["run-android"] = series("ion-build", "sync", "open-android");
