"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var nodemon = require("gulp-nodemon");
var browserSync = require("browser-sync").create();
// var uglify = require("gulp-uglify");

/*
 * Directories here
 */
let paths = {
  src: "./src/",
  scss: "./src/public/sass/",
  css: "./src/public/styles/"
  // data: "./src/"
};

// First, run all your tasks
// gulp.task("default", ["nodemon", "sass", "js"], function() {
gulp.task("default", ["nodemon", "sass"], function() {
  // Then watch for changes
  // gulp.watch("src/public/sass/*.scss", ["sass"]);
  gulp.watch("src/public/sass/**/*.scss", sass);
  gulp.watch("src/views/*.pug").on("change", browserSync.reload); //Manual Reloading

  // JS changes need to tell browsersync that they're done
  // gulp.watch("src/*/*.js", ["js-watch"]);
});

// create a task that ensures the `js` task is complete before
// reloading browsers
// gulp.task("js-watch", ["js"], function(done) {
//   browserSync.reload();
//   done();
// });

// Process JS files and return the stream.
// gulp.task("js", function() {
//   return (
//     gulp
//       .src("src/js/*.js")
//       // .pipe(uglify())
//       .pipe(gulp.dest("public/javascripts"))
//   );
// });

// Compile SASS to CSS.
// gulp.task("sass", function() {
//   return gulp
//     .src("src/public/sass/*.scss")
//     .pipe(sass().on("error", sass.logError))
//     .pipe(gulp.dest("src/public/styles"))
//     .pipe(browserSync.stream());
// });

// Compile SASS to CSS.
gulp.task("sass", function() {
  return gulp
    .src(paths.scss + "*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      sass({
        includePaths: [paths.scss],
        outputStyle: "compressed"
      })
    )
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});

// Setup proxy for local server.
// gulp.task("browser-sync", ["js", "sass"], function() {
//   browserSync.init(null, {
//     proxy: "http://localhost:3000",
//     port: 7000
//   });
// });
// Setup proxy for local server.
gulp.task("browser-sync", ["sass"], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    port: 7000
  });
});

gulp.task("nodemon", ["browser-sync"], function(cb) {
  var running = false;
  return nodemon({ script: "src/index" }).on("start", function() {
    if (!running) {
      running = true;
      cb();
    }
  });
});
